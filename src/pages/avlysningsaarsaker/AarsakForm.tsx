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
import { AarsakType, ApiAarsak, ApiAarsakPatch, ApiAarsakPost } from '../../services/aarsak/AarsakService';
import { useAddAarsak } from '../../services/aarsak/useAddAarsak';
import { useUpdateAarsak } from '../../services/aarsak/useUpdateAarsak';
import { RadiobuttonGroup, RadioOption } from '../../components/forms/RadiobuttonGroup';

interface AarsakFormData {
    beskrivelse: string;
    type: AarsakType;
}

const aarsakTypeOptions: Array<RadioOption<AarsakType>> = [
    { value: 'PARTNER', label: 'Partner' },
    { value: 'STASJON', label: 'Stasjon' },
];

const validationSchema = yup.object().shape({
    type: yup
        .mixed()
        .label('type for årsaken')
        .required()
        .oneOf(aarsakTypeOptions.map((aarsakType) => aarsakType.value)),
    beskrivelse: yup.string().label('avlysningstekst').required().min(2),
});

interface Props {
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
                onApiSubmitSuccess(`Årsaken ble registrert`);
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
                    <RadiobuttonGroup name="type" label="Type årsak" options={aarsakTypeOptions} required />
                    <Input name="beskrivelse" label="Beskrivelse av årsak" required />
                    <FormSubmitButton
                        label={aarsakToEdit ? 'Lagre endringer' : 'Registrer ny avlysningstekst'}
                        isLoading={updateAarsakMutation.isLoading || addAarsakMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
