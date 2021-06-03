import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/forms/Input';
import { Stack } from '@chakra-ui/react';
import { FieldErrorMessages } from '../../../components/forms/FieldErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddPartner } from '../../../services/partner/useAddPartner';
import { ApiPartnerPost, PartnerStorrelse } from '../../../services/partner/PartnerService';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const storrelseOptions: Array<RadioOption<PartnerStorrelse>> = [
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

    const handleSubmit = formMethods.handleSubmit((data) => {
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
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <FieldErrorMessages />
                    <Input name="navn" label="Navn på organisasjon" required />
                    <RadiobuttonGroup name="storrelse" label="Størrelse" options={storrelseOptions} required />
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
