import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiHenteplanPost, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { useAddHenteplan } from '../../../services/henteplan/useAddHenteplan';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';
import { TimeInput } from '../../../components/forms/TimeInput';
import { DateInput } from '../../../components/forms/DateInput';
import { Select, SelectOption } from '../../../components/forms/Select';
import { TextArea } from '../../../components/forms/TextArea';
import { formatDate } from '../../../utils/formatDateTime';
import { AVTALE_TYPE, getAvtaleTitle } from '../avtale/AvtaleInfoItem';
import { mergeDateWithTime } from '../../../utils/forms/mergeDateWithTime';
import { getHenteplanValidationSchema } from './henteplanFormSchema';
import { FormInfoBody, FormInfoHeading, FormInfoSection } from '../../../components/forms/FormInfoSection';
import { toISOLocalString } from '../../../utils/localDateISO';
import { parseISO } from 'date-fns';
import { KategoriSelect } from '../../../components/forms/KategoriSelect';

// NB! Setting the global error messages used by yup
import '../../../utils/forms/formErrorMessages';

interface HenteplanFormData {
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    ukedag?: Weekday;
    startDato: Date;
    sluttDato?: Date;
    startTidspunkt: Date;
    sluttTidspunkt: Date;
    merknad?: string;
}

export const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

export const ukedagOptions: Array<SelectOption<Weekday>> = [
    { value: 'MONDAY', label: 'Mandag' },
    { value: 'TUESDAY', label: 'Tirsdag' },
    { value: 'WEDNESDAY', label: 'Onsdag' },
    { value: 'THURSDAY', label: 'Torsdag' },
    { value: 'FRIDAY', label: 'Fredag' },
    { value: 'SATURDAY', label: 'Lørdag' },
    { value: 'SUNDAY', label: 'Søndag' },
];

interface Props {
    avtale: ApiAvtale;
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

const createNewHenteplan = (data: HenteplanFormData, avtale: ApiAvtale): ApiHenteplanPost => {
    const startTidspunkt = toISOLocalString(mergeDateWithTime(data.startDato, data.startTidspunkt));
    const sluttTidspunkt = toISOLocalString(mergeDateWithTime(data.sluttDato || data.startDato, data.sluttTidspunkt));

    return {
        avtaleId: avtale.id,
        frekvens: data.frekvens,
        ukedag: data.ukedag,
        stasjonId: data.stasjonId,
        startTidspunkt,
        sluttTidspunkt,
        merknad: data.merknad,
    };
};

export const HenteplanForm: React.FC<Props> = ({ avtale, onSuccess }) => {
    const validationSchema = getHenteplanValidationSchema(avtale);
    const formMethods = useForm<HenteplanFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
        defaultValues: {
            startDato: avtale.startDato,
            sluttDato: avtale.sluttDato,
        },
        // The following line unregisters fields that are conditionally hidden (e.g. by changing "Frekvens" in this form).
        //  This fixes a problem where errors for hidden fields are not cleared from the react-hook-form errors object.
        //  But this setting comes with some caveats: https://react-hook-form.com/api/useform (see "shouldUnregister" section)
        shouldUnregister: true,
    });

    const addHenteplanMutation = useAddHenteplan();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        const newHenteplan = createNewHenteplan(data, avtale);

        addHenteplanMutation.mutate(newHenteplan, {
            onSuccess: () => {
                showSuccessToast({ title: `Henteplanen ble registrert` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: get details from error and set appropriate message.
                //  If caused by user: set message to correct field
                setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
            },
        });
    });

    const frekvens = formMethods.watch('frekvens', undefined);
    const isRecurring = frekvens && frekvens !== 'ENKELT';
    const avtaleVarighet = `fra ${formatDate(parseISO(avtale.startDato))} til ${formatDate(
        parseISO(avtale.sluttDato),
    )}`;

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <FormInfoSection>
                        <FormInfoHeading>Gjelder for {getAvtaleTitle(avtale).toLowerCase()}:</FormInfoHeading>
                        <FormInfoBody>
                            {AVTALE_TYPE[avtale.type]} {avtaleVarighet}
                        </FormInfoBody>
                    </FormInfoSection>
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <StasjonSelect
                        name="stasjonId"
                        label="Stasjon"
                        helperText="Hvilken stasjon skal det hentes fra?"
                        required
                    />
                    <RadiobuttonGroup
                        name="frekvens"
                        label="Frekvens"
                        options={frekvensOptions}
                        helperText="Hvor ofte skal hentingene skje?"
                        required
                    />
                    {/* TODO: group startDato and sluttDato in fieldset with legend "Varighet"? */}
                    {frekvens ? (
                        <DateInput
                            name="startDato"
                            label={isRecurring ? 'Startdato for henteplanen' : 'Dato for hentingen'}
                            helperText={`Må være innenfor avtalens varighet (${avtaleVarighet})`}
                            required
                        />
                    ) : null}
                    {isRecurring ? (
                        <DateInput
                            name="sluttDato"
                            label="Sluttdato for henteplanen"
                            helperText={`Må være innenfor avtalens varighet (${avtaleVarighet})`}
                            required
                        />
                    ) : null}
                    {/* TODO: group ukedag, starttidspunkt and sluttidspunkt in fieldset with legend "Tidspunkt"? */}
                    {isRecurring ? (
                        <Select
                            name="ukedag"
                            label="Ukedag"
                            placeholder="Velg ukedag"
                            helperText="Hvilken ukedag skal hentingene skje?"
                            options={ukedagOptions}
                            required
                        />
                    ) : null}
                    <TimeInput
                        name="startTidspunkt"
                        label="Starttidspunkt"
                        helperText="Fra hvilket tidspunkt kan partneren komme og hente?"
                        required
                    />
                    <TimeInput
                        name="sluttTidspunkt"
                        label="Sluttidspunkt"
                        helperText="Til hvilket tidspunkt kan partneren komme og hente?"
                        required
                    />
                    <KategoriSelect
                        name="kategorier"
                        label="Kategorier"
                        helperText="Hvilken type varer skal partneren kunne hente?"
                        required
                    />
                    <TextArea name="merknad" label="Merknader" />
                    <FormSubmitButton
                        label="Registrer ny henteplan"
                        isLoading={addHenteplanMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
