import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { PartnerSelectMultiple } from '../../../components/forms/PartnerSelect';
import { useBatchAddUtlysning } from '../../../services/utlysning/useBatchAddUtlysning';
import { ApiUtlysningBatchPost } from '../../../services/utlysning/UtlysningService';
import { usePartnere } from '../../../services/partner/usePartnere';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

interface EkstraHentingFormData {
    utlysningSelect: UtlysningSelectorType;
    partnere: Array<string>;
}

export type UtlysningSelectorType = 'ALL' | 'CUSTOM';

export const utlysningSelectorOptions: Array<RadioOption<UtlysningSelectorType>> = [
    { value: 'ALL', label: 'Alle' },
    { value: 'CUSTOM', label: 'Velg hvem som kan melde seg på' },
];

const validationSchema = yup.object().shape({
    utlysningSelect: yup
        .mixed<UtlysningSelectorType>()
        .label('hvem som skal få varsel')
        .required()
        .oneOf(utlysningSelectorOptions.map((option) => option.value)),
    partnere: yup
        .array(yup.string())
        .when('utlysningSelect', (utlysningSelector: UtlysningSelectorType | undefined, schema) => {
            if (utlysningSelector === 'CUSTOM') {
                return schema.ensure().min(1, 'Du må velge minst én partner å sende utlysning til');
            } else {
                return schema.notRequired();
            }
        }),
});

interface Props {
    henting: ApiEkstraHenting;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const UtlysFlerePartnereForm: React.FC<Props> = ({ henting, onSuccess }) => {
    const existingPartnere = henting.utlysninger.map((utlysning) => utlysning.partnerId);

    const formMethods = useForm<EkstraHentingFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            // This assumes that the form is only accessed when the `Ekstrahenting` is not sent to all partners already
            utlysningSelect: 'CUSTOM',
            partnere: existingPartnere,
        },
    });

    const { data: allPartnere } = usePartnere();
    const batchAddUtlysningMutation = useBatchAddUtlysning();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        batchAddUtlysning({
            hentingId: henting.id,
            // TODO: next line is not a very robust solution, can potentially set `partnere` to `undefined`
            //  if there is a problem fetching the partners from the api
            partnerIds:
                formData.utlysningSelect === 'ALL'
                    ? allPartnere?.map((partner) => partner.id) || []
                    : formData.partnere,
        });
    });

    const batchAddUtlysning = (newUtlysninger: ApiUtlysningBatchPost) => {
        batchAddUtlysningMutation.mutate(newUtlysninger, {
            onSuccess: () => {
                onApiSubmitSuccess(`Utlysning ble sendt til nye partnere`);
            },
            onError: onApiSubmitError,
        });
    };

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: successMessage });
        onSuccess?.();
    };

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        setApiOrNetworkError('Uffda, noe gikk galt ved utlysningen. Vennligst prøv igjen.');
    };

    const utlysningsSelect = formMethods.watch('utlysningSelect');

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <RadiobuttonGroup
                        name="utlysningSelect"
                        label="Hvem kan melde seg på?"
                        options={utlysningSelectorOptions}
                        required
                    />
                    {utlysningsSelect === 'CUSTOM' ? (
                        <PartnerSelectMultiple
                            name="partnere"
                            label="Velg partnere"
                            existingPartnere={existingPartnere}
                            disableExisting
                        />
                    ) : null}
                    <FormSubmitButton
                        label="Send utlysning til partnere"
                        isLoading={batchAddUtlysningMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
