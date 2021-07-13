import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/forms/input/Input';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { ApiError } from '../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../utils/forms/formErrorMessages';
import { WarningBody, WarningContainer, WarningTitle } from '../../components/forms/Warning';
import { ApiAarsak, ApiAarsakPatch, ApiAarsakPost } from '../../services/aarsak/AarsakService';
import { useAddAarsak } from '../../services/aarsak/useAddAarsak';
import { useUpdateAarsak } from '../../services/aarsak/useUpdateAarsak';

interface AarsakFormData {
    beskrivelse: string;
}

const validationSchema = yup.object().shape({
    beskrivelse: yup.string().label('Avlysningstekst').required().min(2),
});

interface Props {
    /** By passing an existing kategori, the form will be in edit mode **/
    aarsakToEdit?: ApiAarsak;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const AarsakForm: React.FC<Props> = ({ aarsakToEdit, onSuccess }) => {
    const formMethods = useForm<AarsakFormData>({
        resolver: yupResolver(validationSchema),
    });

    const addAarsakMutation = useAddAarsak();
    const updateAarsakMutation = useUpdateAarsak();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (aarsakToEdit) {
            updateAarsak({
                id: aarsakToEdit.id,
                beskrivelse: formData.beskrivelse,
            });
        } else {
            addAarsak({
                ...formData,
            });
        }
    });

    const addAarsak = (newAarsak: ApiAarsakPost) =>
        addAarsakMutation.mutate(newAarsak, {
            onSuccess: () => {
                onApiSubmitSuccess(`Årsak ble registrert`);
            },
            onError: onApiSubmitError,
        });

    const updateAarsak = (updateAarsak: ApiAarsakPatch) =>
        updateAarsakMutation.mutate(updateAarsak, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret`);
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
        setApiOrNetworkError('Uffda, noe gikk galt. Vennligst prøv igjen.');
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />

                    {aarsakToEdit ? (
                        <WarningContainer variant="warning">
                            <WarningTitle title="Advarsel" />
                            <WarningBody>
                                Ved endring av navn vil vektrapporter tilknyttet denne kategorien også endres.
                            </WarningBody>
                            <Input name="beskrivelse" label="Beskrivelse av årsak" required />
                        </WarningContainer>
                    ) : (
                        <Input name="beskrivelse" label="Beskrivelse av årsak" required />
                    )}

                    <FormSubmitButton
                        label={aarsakToEdit ? 'Lagre endringer' : 'Registrer ny årsak'}
                        isLoading={updateAarsakMutation.isLoading || addAarsakMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
