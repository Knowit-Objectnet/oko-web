import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../../components/forms/TextInput';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddPartner } from '../../../services-currentapi/partner/useAddPartner';
import { ApiPartnerPost, PartnerStorrelse } from '../../../services-currentapi/partner/PartnerService';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

// NB! Setting the error messages used by yup
import '../../../components/forms/formErrorMessages';

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
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

export const PartnerForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<ApiPartnerPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addPartnerMutation = useAddPartner();
    const showSuccessToast = useSuccessToast();

    const handlePartnerSubmission = formMethods.handleSubmit((data) => {
        addPartnerMutation.mutate(data, {
            onSuccess: () => {
                showSuccessToast({ title: `${data.navn} ble registrert som samarbeidspartner` });
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
            <form onSubmit={handlePartnerSubmission}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <AllFormErrorMessages />
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
                    <FormSubmitButton label="Registrer ny samarbeidspartner" isLoading={addPartnerMutation.isLoading} />
                </Stack>
            </form>
        </FormProvider>
    );
};
