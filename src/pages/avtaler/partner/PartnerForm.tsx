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
import { ApiPartnerPost } from '../../../services/partner/PartnerService';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn for samarbeidspartneren').trim().required().min(2),
    ideell: yup.boolean().label('Om partneren er en ideell organisasjon').required(),
});

interface Props {
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

export const PartnerForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<ApiPartnerPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addPartnerMutation = useAddPartner();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        addPartnerMutation.mutate(data, {
            onSuccess: () => {
                showSuccessToast({ title: `${data.navn} ble registrert som samarbeidspartner` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: get details from error and set appropriate message.
                //  If caused by user: set message to correct field
                setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn på organisasjon" required />
                    <CheckboxGroup
                        label="Organisasjonstype"
                        options={[{ name: 'ideell', label: 'Ideell organisasjon' }]}
                        required
                    />
                    <FormSubmitButton
                        label="Registrer ny samarbeidspartner"
                        isLoading={addPartnerMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
