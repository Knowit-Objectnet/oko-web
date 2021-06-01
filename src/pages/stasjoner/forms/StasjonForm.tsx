import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ApiStasjonPost, StasjonType } from '../../../services/stasjon/StasjonService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddStasjon } from '../../../services/stasjon/useAddStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

// NB! Setting the error messages used by yup
import '../../../components/forms/formErrorMessages';

const stasjonTypeOptions: Array<SelectOption<StasjonType>> = [
    { value: 'GJENBRUK', label: 'Gjenbruksstasjon' },
    { value: 'MINI', label: 'Minigjenbruksstasjon' },
];

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på stasjonen').trim().required().min(2),
    type: yup
        .mixed<StasjonType>()
        .label('type for stasjonen')
        .required()
        .oneOf(stasjonTypeOptions.map(({ value }) => value)),
});

interface Props {
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<ApiStasjonPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addStasjonMutation = useAddStasjon();
    const showSuccessToast = useSuccessToast();

    const handleSubmit = formMethods.handleSubmit((data) => {
        addStasjonMutation.mutate(data, {
            onSuccess: () => {
                showSuccessToast({ title: `Stasjonen ${data.navn} ble registrert` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: find a way to identify and display errors that are not caused by user (network, server issues etc.)
                // TODO: get details from error and if caused by user: set message to correct field
                formMethods.setError('navn', { message: error.message });
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <AllFormErrorMessages />
                    <TextInput name="navn" label="Navn på stasjonen" required />
                    <Select
                        name="type"
                        label="Type stasjon"
                        options={stasjonTypeOptions}
                        placeholder="Velg en type"
                        required
                    />
                    <FormSubmitButton label="Registrer ny stasjon" isLoading={addStasjonMutation.isLoading} />
                </Stack>
            </form>
        </FormProvider>
    );
};
