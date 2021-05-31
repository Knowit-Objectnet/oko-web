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
import { ApiStasjonPost } from '../../../services-currentapi/AktorService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';

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
    afterSubmit?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ afterSubmit }) => {
    const formMethods = useForm<ApiStasjonPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const handlePartnerSubmission = formMethods.handleSubmit((data) => {
        console.log(data);
        // TODO: submit data to API with useMutation (react-query) (post or patch, depending on form is in edit mode)
        //  - pass loading state to button / disable form
        //  - pass errors from backend response (onError react-query callback):
        //  formMethods.setError('navn', { message: 'Stasjon med dette navnet eksisterer allerede' });
        afterSubmit?.();
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
                    <FormSubmitButton
                        label="Registrer ny stasjon"
                        // TODO: isLoading-state from submission here
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
