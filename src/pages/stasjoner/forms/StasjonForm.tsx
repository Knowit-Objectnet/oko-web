import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { StasjonType } from '../../../types';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import {
    ApiStasjon,
    ApiStasjonPost,
    postStasjon,
    stasjonDefaultQueryKey,
} from '../../../services-currentapi/StasjonService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useMutation, useQueryClient } from 'react-query';

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
    afterSubmit?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ afterSubmit }) => {
    const formMethods = useForm<ApiStasjonPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const queryClient = useQueryClient();
    const addStasjonMutation = useMutation((newStasjon: ApiStasjonPost) => postStasjon(newStasjon), {
        onSuccess: () => {
            // alert.show('Stasjonen ble lagt til.', { type: types.SUCCESS });
            // afterSubmit?.();
        },
        onError: (error) => {
            // TODO: get details from error and set message to correct field
            formMethods.setError('navn', { message: 'noe gikk galt' });
        },
        onSettled: () => {
            queryClient.invalidateQueries(stasjonDefaultQueryKey);
        },
    });

    const handlePartnerSubmission = formMethods.handleSubmit((data) => {
        addStasjonMutation.mutate(data);
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handlePartnerSubmission}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <TextInput name="navn" label="Navn på stasjonen" required />
                    <Select
                        name="type"
                        label="Type stasjon"
                        options={stasjonTypeOptions}
                        placeholder="Velg en type"
                        required
                    />
                    <AllFormErrorMessages />
                    <FormSubmitButton label="Registrer ny stasjon" isLoading={addStasjonMutation.isLoading} />
                </Stack>
            </form>
        </FormProvider>
    );
};
