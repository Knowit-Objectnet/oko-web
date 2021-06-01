import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { PartnerStorrelse } from '../../../types';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';

// NB! Setting the error messages used by yup
import '../../../components/forms/formErrorMessages';
import { ApiPartnerPost } from '../../../services-currentapi/PartnerService';

const storrelseOptions: Array<SelectOption<PartnerStorrelse>> = [
    { value: 'LITEN', label: 'Liten' },
    { value: 'MIDDELS', label: 'Middels' },
    { value: 'STOR', label: 'Stor' },
];

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn for samarbeidspartneren').trim().required().min(2),
    storrelse: yup
        .mixed<PartnerStorrelse>()
        .label('størrelse på samarbeidspartneren')
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
                <Stack direction="column" spacing="8">
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
                    <FormSubmitButton
                        label="Registrer ny samarbeidspartner"
                        // TODO: isLoading-state from submission here
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
