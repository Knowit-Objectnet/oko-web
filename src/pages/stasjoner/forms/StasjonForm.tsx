import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ApiStasjon, ApiStasjonPost, StasjonType } from '../../../services-currentapi/StasjonService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddStasjon } from '../../../services-currentapi/hooks/useAddStasjon';

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
    stasjon?: ApiStasjon;
    onSuccess?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<ApiStasjonPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addStasjonMutation = useAddStasjon();

    const handlePartnerSubmission = formMethods.handleSubmit((data) => {
        addStasjonMutation.mutate(data, {
            onSuccess: () => {
                // alert.show('Stasjonen ble lagt til.', { type: types.SUCCESS });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: get details from error and set message to correct field
                formMethods.setError('navn', { message: error.message });
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handlePartnerSubmission}>
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
