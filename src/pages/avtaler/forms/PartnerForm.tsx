import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { PartnerStorrelse } from '../../../types';
import { Button, Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { ApiPartnerPost } from '../../../services-new/AktorService';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';

const storrelseOptions: Array<SelectOption<PartnerStorrelse, string>> = [
    { value: 'LITEN', label: 'Liten' },
    { value: 'MIDDELS', label: 'Middels' },
    { value: 'STOR', label: 'Stor' },
];

yup.setLocale({
    string: {
        min: '${label} må bestå av minst ${min} tegn',
        max: '${label} må være ikke være lenger enn ${max} tegn',
    },
    mixed: {
        required: 'Du må oppgi ${label}',
        oneOf: 'Du må velge ${label}',
    },
});

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn for samarbeidspartneren').required().min(2),
    storrelse: yup
        .mixed<PartnerStorrelse>()
        .label('størrelse på partneren')
        .required()
        .oneOf(storrelseOptions.map(({ value }) => value)),
    ideell: yup.boolean().label('Om partneren er en ideell organisasjon').required(),
});

interface Props {
    afterSubmit?: () => void;
}

export const PartnerForm: React.FC<Props> = ({ afterSubmit }) => {
    const formMethods = useForm<ApiPartnerPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const handlePartnerSubmission = formMethods.handleSubmit((data) => {
        console.log(data);
        // TODO: submit data to API with useMutation (react-query) (post or patch, depending on form is in edit mode)
        //  - pass loading state to button / disable form
        //  - pass errors from backend response (onError react-query callback):
        //  formMethods.setError('navn', { message: 'Partner med dette navnet eksisterer allerede' });
        afterSubmit?.();
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handlePartnerSubmission}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <TextInput name="navn" label="Navn på organisasjon" required />
                    <Select
                        name="storrelse"
                        label="Størrelse"
                        options={storrelseOptions}
                        placeholder="Velg en størrelse"
                        required
                    />
                    <CheckboxGroup
                        label="Organisasjonstype"
                        options={[{ name: 'ideell', label: 'Ideell organisasjon' }]}
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
                        Registrer ny samarbeidspartner
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};
