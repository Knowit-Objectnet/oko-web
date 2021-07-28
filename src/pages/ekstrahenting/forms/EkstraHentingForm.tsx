import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';
import { KategoriSelect } from '../../../components/forms/KategoriSelect';
import { TextArea } from '../../../components/forms/TextArea';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { TimeInput } from '../../../components/forms/input/TimeInput';
import { EkstraHentingFormTidspunkt } from './EkstraHentingFormTidspunkt';
import { PartnerSelectMultiple } from '../../../components/forms/PartnerSelect';
import { ApiEkstraHentingPost } from '../../../services/henting/EkstraHentingService';
import { useAddEkstraHenting } from '../../../services/henting/useAddEkstraHenting';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';
import { usePartnere } from '../../../services/partner/usePartnere';
import { getEkstraHentingValidationSchema } from './EkstraHentingFormSchema';
import { dateTimeToStringIgnoreTimezone, mergeDateWithTimeToString } from '../../../utils/hentingDateTimeHelpers';
import { WarningBody, WarningContainer } from '../../../components/forms/Warning';
import { utlysningSelectorOptions, UtlysningSelectorType } from './UtlysFlerePartnereForm';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

interface EkstraHentingFormData {
    stasjon: string;
    beskrivelse: string;
    tidspunkt: Tidspunkt;
    kategorier: Array<string>;
    utlysningSelect: UtlysningSelectorType;
    dato: Date;
    startTidspunkt: Date;
    sluttTidspunkt: Date;
    partnere: Array<string>;
}

export type Tidspunkt = 'NOW' | 'CUSTOM';

export const tidspunktOptions: Array<RadioOption<Tidspunkt>> = [
    { value: 'NOW', label: 'Med en gang' },
    { value: 'CUSTOM', label: 'Jeg vil sette tidspunkt' },
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

    const { data: allPartnere } = usePartnere({ queryOptions: { keepPreviousData: true } });
    const addEkstraHentingMutation = useAddEkstraHenting();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const transformFormData = (formData: EkstraHentingFormData): ApiEkstraHentingPost => {
        return {
            stasjonId: stasjonId || formData.stasjon,
            startTidspunkt:
                formData.tidspunkt === 'NOW'
                    ? dateTimeToStringIgnoreTimezone(new Date())
                    : mergeDateWithTimeToString(formData.dato, formData.startTidspunkt),
            sluttTidspunkt:
                formData.tidspunkt === 'NOW'
                    ? mergeDateWithTimeToString(new Date(), formData.sluttTidspunkt)
                    : mergeDateWithTimeToString(formData.dato, formData.sluttTidspunkt),
            beskrivelse: formData.beskrivelse,
            kategorier: formData.kategorier.map((kategoriId) => ({ kategoriId })),
            // TODO: next line is not a very robust solution, can potentially set `partnere` to `undefined`
            //  if there is a problem fetching the partners from the api
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

    const tidspunkt = formMethods.watch('tidspunkt', undefined);
    const utlysningsSelect = formMethods.watch('utlysningSelect');

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    {!stasjonId ? <StasjonSelect name="stasjon" label="Velg stasjon" required /> : null}
                    <TextArea name="beskrivelse" label="Beskrivelse" required />
                    <RadiobuttonGroup name="tidspunkt" label="Når?" options={tidspunktOptions} required />
                    {tidspunkt === 'NOW' ? (
                        <TimeInput
                            name="sluttTidspunkt"
                            label="Sluttidspunkt"
                            helperText="Til hvilket tidspunkt kan partneren komme og hente?"
                        />
                    ) : null}
                    {tidspunkt === 'CUSTOM' ? <EkstraHentingFormTidspunkt /> : null}
                    <KategoriSelect
                        name="kategorier"
                        label="Kategorier"
                        helperText="Hvilke kategorier kan hentes?"
                        required
                    />
                    <WarningContainer variant="warning">
                        <WarningBody>
                            OBS! Hvitevarer og tekstiler kan kun hentes av noen aktører. Ved valg av disse
                            varekategoriene trykk “Velg ut hvem som kan melde seg på” for å velge aktuelle aktører.
                        </WarningBody>
                    </WarningContainer>
                    <RadiobuttonGroup
                        name="utlysningSelect"
                        label="Hvem kan melde seg på?"
                        options={utlysningSelectorOptions}
                        required
                    />
                    {utlysningsSelect === 'CUSTOM' ? (
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
