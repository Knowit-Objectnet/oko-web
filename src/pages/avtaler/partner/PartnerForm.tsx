import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/forms/Input';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddPartner } from '../../../services/partner/useAddPartner';
import { ApiPartner, ApiPartnerPatch, ApiPartnerPost } from '../../../services/partner/PartnerService';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useUpdatePartner } from '../../../services/partner/useUpdatePartner';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn for samarbeidspartneren').trim().required().min(2),
    ideell: yup.boolean().label('Om partneren er en ideell organisasjon').required(),
});

interface PartnerFormData {
    navn: string;
    ideell: boolean;
}

interface Props {
    /** By passing an existing partner, the form will be in edit mode **/
    partnerToEdit?: ApiPartner;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const PartnerForm: React.FC<Props> = ({ partnerToEdit, onSuccess }) => {
    const formMethods = useForm<PartnerFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: partnerToEdit
            ? {
                  navn: partnerToEdit.navn,
                  ideell: partnerToEdit.ideell,
              }
            : undefined,
    });

    const addPartnerMutation = useAddPartner();
    const updatePartnerMutation = useUpdatePartner();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (partnerToEdit) {
            updatePartner({
                id: partnerToEdit.id,
                ...formData,
            });
        } else {
            addPartner(formData);
        }
    });

    const addPartner = (newPartner: ApiPartnerPost) =>
        addPartnerMutation.mutate(newPartner, {
            onSuccess: () => {
                onApiSubmitSuccess(`${newPartner.navn} ble registrert som samarbeidspartner`);
            },
            onError: onApiSubmitError,
        });

    const updatePartner = (updatedPartner: ApiPartnerPatch) =>
        updatePartnerMutation.mutate(updatedPartner, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret for ${updatedPartner.navn}`);
            },
            onError: onApiSubmitError,
        });

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: successMessage });
        onSuccess?.();
    };

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn på organisasjon" required />
                    <CheckboxGroup
                        name="ideell"
                        label="Organisasjonstype"
                        options={[{ value: 'true', label: 'Ideell organisasjon' }]}
                        required
                    />
                    <FormSubmitButton
                        label={partnerToEdit ? 'Lagre endringer' : 'Registrer ny samarbeidspartner'}
                        isLoading={updatePartnerMutation.isLoading || addPartnerMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
