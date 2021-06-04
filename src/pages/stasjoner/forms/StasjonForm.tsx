import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/forms/Input';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ApiStasjonPost, StasjonType } from '../../../services/stasjon/StasjonService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddStasjon } from '../../../services/stasjon/useAddStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

// TODO uncomment when we want to set station type in form
// const stasjonTypeOptions: Array<RadioOption<StasjonType>> = [
//     { value: 'GJENBRUK', label: 'Gjenbruksstasjon' },
//     { value: 'MINI', label: 'Minigjenbruksstasjon' },
// ];

interface StasjonFormData {
    navn: string;
}

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på stasjonen').trim().required().min(2),
    // TODO uncomment when we want to set station type in form
    // type: yup
    //     .mixed<StasjonType>()
    //     .label('type for stasjonen')
    //     .required()
    //     .oneOf(stasjonTypeOptions.map((type) => type.value)),
});

interface Props {
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

export const StasjonForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<StasjonFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addStasjonMutation = useAddStasjon();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        const newStation: ApiStasjonPost = {
            ...data,
            // TODO: remove when we want to set station type in form
            type: 'GJENBRUK',
        };

        addStasjonMutation.mutate(newStation, {
            onSuccess: () => {
                showSuccessToast({ title: `Stasjonen ${newStation.navn} ble registrert` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: get details from error and set appropriate message.
                //  If caused by user: set message to correct field
                setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn på stasjonen" required />
                    {/* TODO: uncomment when we want to set station type :
                    <RadiobuttonGroup name="type" label="Type stasjon" options={stasjonTypeOptions} required />*/}
                    <FormSubmitButton
                        label="Registrer ny stasjon"
                        isLoading={addStasjonMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
