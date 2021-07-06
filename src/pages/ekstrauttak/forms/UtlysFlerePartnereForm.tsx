import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { PartnerSelectMultiple } from '../../../components/forms/PartnerSelect';
import { useBatchAddUtlysning } from '../../../services/utlysning/useBatchAddUtlysning';
import { ApiUtlysningBatchPost } from '../../../services/utlysning/UtlysningService';
import { usePartnere } from '../../../services/partner/usePartnere';
import { ApiEkstraHenting } from '../../../services/henting/EkstraHentingService';

interface EkstraUttakFormData {
    utlysningSelect: UtlysningSelectorType;
    partnere: string[];
}

type UtlysningSelectorType = 'ALL' | 'CUSTOM';

export const utlysningSelectorOptions: Array<RadioOption<UtlysningSelectorType>> = [
    { value: 'ALL', label: 'Alle' },
    { value: 'CUSTOM', label: 'Velg ut hvem som kan melde seg på' },
];

const validationSchema = () =>
    yup.object().shape({
        utlysningSelect: yup
            .mixed<UtlysningSelectorType>()
            .label('hvem som skal få varsel')
            .required()
            .oneOf(utlysningSelectorOptions.map((opt) => opt.value)),
        partnere: yup.array(yup.string()).when('utlysningSelect', (us: UtlysningSelectorType | undefined, schema) => {
            if (us && us === 'CUSTOM') {
                return schema.ensure().min(1, 'Du må velge minst én partner å sende utlysning');
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
    const formMethods = useForm<EkstraUttakFormData>({
        resolver: yupResolver(validationSchema()),
    });

    const { data: allPartnere, isLoading, isLoadingError } = usePartnere({ queryOptions: { keepPreviousData: true } });
    const batchAddUtlysningMutation = useBatchAddUtlysning();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        batchAddUtlysning({ hentingId: henting.id, partnerIds: formData.partnere || allPartnere?.map((p) => p.id) });
    });

    const batchAddUtlysning = (newUtlysninger: ApiUtlysningBatchPost) => {
        batchAddUtlysningMutation.mutate(newUtlysninger, {
            onSuccess: () => {
                onApiSubmitSuccess('Utlysningene gjennomført');
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
        setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
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
                    {utlysningsSelect && utlysningsSelect == 'CUSTOM' ? (
                        <PartnerSelectMultiple
                            name="partnere"
                            label="Velg partnere"
                            existingPartnere={henting.utlysninger.map((u) => u.partnerId)}
                        />
                    ) : null}
                    <FormSubmitButton
                        label="Registrer nytt ekstrauttak"
                        // isLoading={addEkstraHentingMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
            <Checkbox isChecked={true} isDisabled={true}>
                Hello There
            </Checkbox>
        </FormProvider>
    );
};
