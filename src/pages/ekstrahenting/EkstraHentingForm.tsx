import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { ApiError } from '../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../utils/forms/formErrorMessages';
import { KategoriSelect } from '../../components/forms/KategoriSelect';
import { TextArea } from '../../components/forms/TextArea';
import { RadiobuttonGroup, RadioOption } from '../../components/forms/RadiobuttonGroup';
import { TimeInput } from '../../components/forms/input/TimeInput';
import { PartnerSelectMultiple } from '../../components/forms/PartnerSelect';
import { ApiEkstraHentingPost } from '../../services/henting/EkstraHentingService';
import { useAddEkstraHenting } from '../../services/henting/useAddEkstraHenting';
import { StasjonSelect } from '../../components/forms/StasjonSelect';
import { usePartnere } from '../../services/partner/usePartnere';
import { dateTimeToStringIgnoreTimezone, mergeDateWithTimeToString } from '../../utils/hentingDateTimeHelpers';
import { getEkstraHentingValidationSchema } from './forms/EkstraHentingFormSchema';
import { EkstraHentingFormTidspunkt } from './forms/EkstraHentingFormTidspunkt';

interface EkstraHentingFormData {
    stasjon: string;
    beskrivelse: string;
    når: NårType;
    kategorier: string[];
    // hentingType: HentingType;
    utlysningSelect: UtlysningSelectorType;
    dato: Date;
    startTidspunkt: Date;
    sluttTidspunkt: Date;
    partnere: string[];
}

export type NårType = 'NOW' | 'CUSTOM';
type HentingType = 'FIRST' | 'ACCEPT';
export type UtlysningSelectorType = 'ALL' | 'CUSTOM';

export const nårOptions: Array<RadioOption<NårType>> = [
    { value: 'NOW', label: 'Med en gang' },
    { value: 'CUSTOM', label: 'Jeg vil sette tidspunkt' },
];

export const uttakTypeOptions: Array<RadioOption<HentingType>> = [
    { value: 'FIRST', label: 'Førstemann til mølla' },
    { value: 'ACCEPT', label: 'Godkjenning' },
];

export const utlysningSelectorOptions: Array<RadioOption<UtlysningSelectorType>> = [
    { value: 'ALL', label: 'Alle' },
    { value: 'CUSTOM', label: 'Velg ut hvem som kan melde seg på' },
];

interface Props {
    /** By passing a stasjonId, stasjon will be preset **/
    stasjonId?: string;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const EkstraHentingForm: React.FC<Props> = ({ stasjonId, onSuccess }) => {
    const formMethods = useForm<EkstraHentingFormData>({
        resolver: yupResolver(getEkstraHentingValidationSchema(stasjonId)),
    });

    const { data: allPartnere, isLoading, isLoadingError } = usePartnere({ queryOptions: { keepPreviousData: true } });
    const addEkstraHentingMutation = useAddEkstraHenting();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const transformFormData = (formData: EkstraHentingFormData): ApiEkstraHentingPost => {
        return {
            stasjonId: formData.stasjon || stasjonId!,
            startTidspunkt:
                formData.når === 'NOW'
                    ? dateTimeToStringIgnoreTimezone(new Date())
                    : mergeDateWithTimeToString(formData.dato, formData.startTidspunkt),
            sluttTidspunkt:
                formData.når === 'NOW'
                    ? mergeDateWithTimeToString(new Date(), formData.sluttTidspunkt)
                    : mergeDateWithTimeToString(formData.dato, formData.sluttTidspunkt),
            beskrivelse: formData.beskrivelse,
            kategorier: formData.kategorier.map((kategoriId) => {
                return { kategoriId: kategoriId };
            }),
            partnere: formData.partnere || allPartnere?.map((partner) => partner.id),
        };
    };

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        addEkstraHenting(transformFormData(formData));
    });

    const addEkstraHenting = (newHenting: ApiEkstraHentingPost) =>
        addEkstraHentingMutation.mutate(newHenting, {
            onSuccess: () => {
                onApiSubmitSuccess(`Hentingen ble registrert`);
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

    const når = formMethods.watch('når', undefined);
    const utlysningsSelect = formMethods.watch('utlysningSelect');

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    {!stasjonId ? <StasjonSelect name="stasjon" label="Velg stasjon" required /> : null}
                    <TextArea name="beskrivelse" label="Beskrivelse" required />
                    <RadiobuttonGroup name="når" label="Når?" options={nårOptions} required />
                    {når && når == 'NOW' ? (
                        <TimeInput name="sluttTidspunkt" label="Sluttidspunkt" helperText="Frem til kl" />
                    ) : null}
                    {når && når == 'CUSTOM' ? <EkstraHentingFormTidspunkt /> : null}
                    <KategoriSelect
                        name="kategorier"
                        label="Kategorier"
                        helperText="Hvilke kategorier kan hentes?"
                        required
                    />
                    {/* <RadiobuttonGroup name="hentingType" label="Type henting" options={hentingTypeOptions} required /> */}
                    <RadiobuttonGroup
                        name="utlysningSelect"
                        label="Hvem kan melde seg på?"
                        options={utlysningSelectorOptions}
                        required
                    />
                    {utlysningsSelect && utlysningsSelect == 'CUSTOM' ? (
                        <PartnerSelectMultiple name="partnere" label="Velg partnere" />
                    ) : null}
                    <FormSubmitButton
                        label="Registrer ny ekstrahenting"
                        isLoading={addEkstraHentingMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
