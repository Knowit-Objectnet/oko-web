import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { StasjonType } from '../../../types';
import { Button, Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { upperFirst } from 'lodash';
import { ApiStasjonPost } from '../../../services-currentapi/AktorService';

const stjasjonTypeOptions: Array<SelectOption<StasjonType>> = [
    { value: 'GJENBRUK', label: 'Gjenbruksstasjon' },
    { value: 'MINI', label: 'Minigjenbruksstasjon' },
];

yup.setLocale({
    string: {
        min: ({ label, min }: { label: string; min: number }) => `${upperFirst(label)} må bestå av minst ${min} tegn`,
        max: ({ label, max }: { label: string; max: number }) =>
            `${upperFirst(label)} må være ikke være lenger enn ${max} tegn`,
    },
    mixed: {
        required: 'Du må oppgi ${label}',
        oneOf: 'Du må velge ${label}',
    },
});

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på stasjonen').trim().required().min(2),
    type: yup
        .mixed<StasjonType>()
        .label('type stasjon')
        .required()
        .oneOf(stjasjonTypeOptions.map(({ value }) => value)),
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
                        options={stjasjonTypeOptions}
                        placeholder="Velg en type"
                        required
                    />
                    <AllFormErrorMessages />
                    <Button
                        type="submit"
                        width="full"
                        variant="primary"
                        size="lg"
                        // TODO: isLoading-state from submission here
                    >
                        Registrer ny stasjon
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};
