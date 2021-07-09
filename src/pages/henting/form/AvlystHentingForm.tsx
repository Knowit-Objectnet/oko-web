import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { Instruction, RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { ApiPlanlagtHenting, ApiPlanlagtHentingPatch } from '../../../services/henting/HentingService';
import { useUpdateHenting } from '../../../services/henting/useUpdateHenting';
import { AvlystHentingFormAarsakPartner } from './AvlystHentingFormAarsakPartner';
import { useAuth } from '../../../auth/useAuth';
import Warning from '../../../assets/Warning.svg';

interface AvlystHentingFormData {
    avlystAarsak: Array<string>;
}

const validationSchema = yup.object().shape({
    //Usikker på hva dette gjør sånn egentlig
    avlystAarsak: yup.array(yup.string()).ensure().label('årsak for avlysning'),
});

interface Props {
    hentingToCancel: ApiPlanlagtHenting;
    /** Callback that will fire if submission of form is successful: **/
    onSubmit: (formData: AvlystHentingFormData) => Promise<ApiPlanlagtHenting>;
    onSuccess?: () => void;
}

export const AvlystHentingForm: React.FC<Props> = ({ hentingToCancel, onSuccess }) => {
    const formMethods = useForm<AvlystHentingFormData>({
        resolver: yupResolver(validationSchema),
    });

    const { user } = useAuth();

    const updateHentingMutation = useUpdateHenting();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);
        updateHenting({
            ...formData,
            avlys: true,
            aarsak: hentingToCancel.aarsak || undefined,
            id: hentingToCancel.id,
        });
    });

    const updateHenting = (updateHenting: ApiPlanlagtHentingPatch) =>
        updateHentingMutation.mutate(updateHenting, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret for ${updateHenting.id}`);
            },
            onError: onApiSubmitError,
        });

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: successMessage });
        onSuccess?.();
    };

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
    };

    const instructions: Instruction[] = [
        {
            text: 'Fortell hvorfor denne hentingen må avlyses. Beskrivelsen vil sendes til stasjonen og hentingen vil slettes fra deres kalender. Du har ikke mulighet til å angre avlysningen.',
            icon: Warning,
        },
    ];

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction instructions={instructions} useDefault={false} />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <>
                        {user.isPartner ? (
                            <>
                                <AvlystHentingFormAarsakPartner />
                                <FormSubmitButton
                                    label={hentingToCancel ? 'Avlys hentingen' : 'Avlys ny henting'}
                                    isLoading={updateHentingMutation.isLoading}
                                    loadingText="Lagrer..."
                                />
                            </>
                        ) : (
                            <>
                                <AvlystHentingFormAarsakPartner />
                                <FormSubmitButton
                                    label={hentingToCancel ? 'Avlys hentingen' : 'Avlys ny henting'}
                                    isLoading={updateHentingMutation.isLoading}
                                    loadingText="Lagrer..."
                                />
                            </>
                        )}
                    </>
                </Stack>
            </form>
        </FormProvider>
    );
};
