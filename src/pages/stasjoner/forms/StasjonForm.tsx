import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/forms/input/Input';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ApiStasjon, ApiStasjonPatch, ApiStasjonPost } from '../../../services/stasjon/StasjonService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddStasjon } from '../../../services/stasjon/useAddStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useUpdateStasjon } from '../../../services/stasjon/useUpdateStasjon';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

// TODO uncomment when we want to set station type in form
// const stasjonTypeOptions: Array<RadioOption<StasjonType>> = [
//     { value: 'GJENBRUK', label: 'Gjenbruksstasjon' },
//     { value: 'MINI', label: 'Minigjenbruksstasjon' },
// ];

interface StasjonFormData {
    navn: string;
}

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på stasjonen').trim().required().min(2),
    // TODO uncomment when we want to set station type in form
    // type: yup
    //     .mixed<StasjonType>()
    //     .label('type for stasjonen')
    //     .required()
    //     .oneOf(stasjonTypeOptions.map((type) => type.value)),
});

interface Props {
    /** By passing an existing stasjon, the form will be in edit mode **/
    stasjon?: ApiStasjon;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ stasjon, onSuccess }) => {
    const formMethods = useForm<StasjonFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: stasjon
            ? {
                  navn: stasjon.navn,
              }
            : undefined,
    });

    const addStasjonMutation = useAddStasjon();
    const updateStasjonMutation = useUpdateStasjon();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (stasjon) {
            updateStasjon({
                id: stasjon.id,
                navn: formData.navn,
                // TODO: pass type here when we want to set station type in form
            });
        } else {
            addStasjon({
                ...formData,
                // TODO: remove when we want to set station type in form
                type: 'GJENBRUK',
            });
        }
    });

    const addStasjon = (newStasjon: ApiStasjonPost) =>
        addStasjonMutation.mutate(newStasjon, {
            onSuccess: () => {
                onApiSubmitSuccess(`Stasjonen ${newStasjon.navn} ble registrert`);
            },
            onError: onApiSubmitError,
        });

    const updateStasjon = (updatedStasjon: ApiStasjonPatch) =>
        updateStasjonMutation.mutate(updatedStasjon, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret for ${updatedStasjon.navn}`);
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
                    <Input name="navn" label="Navn på stasjonen" required />
                    {/* TODO: uncomment when we want to set station type :
                    <RadiobuttonGroup name="type" label="Type stasjon" options={stasjonTypeOptions} required />*/}
                    <FormSubmitButton
                        label={stasjon ? 'Lagre endringer' : 'Registrer ny stasjon'}
                        isLoading={updateStasjonMutation.isLoading || addStasjonMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
