import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiHenteplanPost, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { useAddHenteplan } from '../../../services/henteplan/useAddHenteplan';
import * as yup from 'yup';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { Heading, Stack, Text } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';
import { TimeInput } from '../../../components/forms/TimeInput';
import { transformDate } from '../../../utils/forms/transformDate';
import { transformTime } from '../../../utils/forms/transformTime';
import { DateInput } from '../../../components/forms/DateInput';
import { Select, SelectOption } from '../../../components/forms/Select';
import { TextArea } from '../../../components/forms/TextArea';
import { Box } from '@chakra-ui/layout';
import { formatDate } from '../../../utils/formatDateTime';
import { AVTALE_TYPE, getAvtaleTitle } from '../AvtaleInfoItem';
import { upperFirst } from 'lodash';
import { parseISO } from 'date-fns';

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

const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

const ukedagOptions: Array<SelectOption<Weekday>> = [
    { value: 'MONDAY', label: 'Mandag' },
    { value: 'TUESDAY', label: 'Tirsdag' },
    { value: 'WEDNESDAY', label: 'Onsdag' },
    { value: 'THURSDAY', label: 'Torsdag' },
    { value: 'FRIDAY', label: 'Fredag' },
    { value: 'SATURDAY', label: 'Lørdag' },
    { value: 'SUNDAY', label: 'Søndag' },
];

const mergeDateWithTime = (date: Date, time: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());

interface Props {
    avtale: ApiAvtale;
    /** Callback that will fire if registration of new Stasjon is successful: **/
    onSuccess?: () => void;
}

const getHenteplanValidationSchema = (avtale: ApiAvtale) =>
    yup.object().shape({
        stasjonId: yup.string().label('hvilken stasjon det skal hentes fra').required(),
        frekvens: yup
            .mixed<HenteplanFrekvens>()
            .label('hvor ofte hentingene skal skje')
            .required()
            .oneOf(frekvensOptions.map((frekvens) => frekvens.value)),
        ukedag: yup
            .mixed<Weekday>()
            .label('hvilken ukedag hentingene skal skje')
            .when('frekvens', (frekvens: HenteplanFrekvens | undefined, schema: yup.BaseSchema) => {
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                if (frekvens && frekvens !== 'ENKELT') {
                    return schema.required();
                }
                return schema.notRequired();
            })
            .oneOf(ukedagOptions.map((ukedag) => ukedag.value)),
        startDato: yup
            .date()
            .transform(transformDate)
            .when(
                'frekvens',
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                    if (!frekvens) {
                        return yup.date().notRequired();
                    } else if (frekvens === 'ENKELT') {
                        return schema.label('dato for hentingen').required();
                    } else {
                        return schema.label('startdato for henteplanen').required();
                    }
                },
            )
            .min(parseISO(avtale.startDato), ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`)
            .max(
                parseISO(avtale.startDato),
                ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
            )
            .nullable(),
        sluttDato: yup
            .date()
            .label('sluttdato for henteplanen')
            .transform(transformDate)
            .when(
                'frekvens',
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                    if (frekvens && frekvens !== 'ENKELT') {
                        return schema
                            .required()
                            .min(yup.ref('startDato'), 'Sluttdatoen for henteplanen kan ikke være før startdatoen')
                            .min(
                                parseISO(avtale.startDato),
                                ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`,
                            )
                            .max(
                                parseISO(avtale.startDato),
                                ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
                            );
                    }
                    return schema.notRequired();
                },
            )
            .nullable(),
        startTidspunkt: yup
            .date()
            .label('starttidspunkt for når partneren kan hente')
            .transform(transformTime)
            .required()
            // TODO: use station opening hours?
            .nullable(),
        sluttTidspunkt: yup
            .date()
            .label('sluttidspunkt for når partneren kan hente')
            .transform(transformTime)
            .required()
            .min(
                // TODO: use station opening hours?
                // TODO: set minimum duration for henting (e.g. 15 mins after startTidspunkt)
                yup.ref('startTidspunkt'),
                'Sluttidspunktet for når partneren kan hente kan ikke være før starttidspunktet',
            )
            .nullable(),
        merknad: yup.string().notRequired(),
    });

export const HenteplanForm: React.FC<Props> = ({ avtale, onSuccess }) => {
    const validationSchema = getHenteplanValidationSchema(avtale);
    const formMethods = useForm<HenteplanFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
        defaultValues: {
            startDato: avtale.startDato,
            sluttDato: avtale.sluttDato,
        },
    });

    const addHenteplanMutation = useAddHenteplan();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        const startTidspunkt = mergeDateWithTime(data.startDato, data.startTidspunkt).toISOString();
        const sluttTidspunkt = mergeDateWithTime(data.sluttDato || data.startDato, data.sluttTidspunkt).toISOString();

        const newHenteplan: ApiHenteplanPost = {
            avtaleId: avtale.id,
            frekvens: data.frekvens,
            ukedag: data.ukedag || 'MONDAY',
            stasjonId: data.stasjonId,
            startTidspunkt,
            sluttTidspunkt,
            merknad: '',
        };

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
    const avtaleVarighet = `fra ${formatDate(avtale.startDato)} til ${formatDate(avtale.sluttDato)}`;

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <Box as="section" backgroundColor="gray.100" width="full" padding="5">
                        <Heading as="h3" fontSize="md" fontWeight="medium">
                            Gjelder for {getAvtaleTitle(avtale).toLowerCase()}:
                        </Heading>
                        <Text>
                            {AVTALE_TYPE[avtale.type]} {avtaleVarighet}
                        </Text>
                    </Box>
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <StasjonSelect label="Stasjon" required name="stasjonId" />
                    <RadiobuttonGroup
                        name="frekvens"
                        label="Frekvens"
                        helperText="Hvor ofte skal hentingene skje?"
                        options={frekvensOptions}
                        required
                    />
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
                    {frekvens ? (
                        <DateInput
                            name="startDato"
                            label={isRecurring ? 'Startdato for henteplanen' : 'Dato for hentingen'}
                            helperText={`Avtalen varer ${avtaleVarighet}`}
                            required
                        />
                    ) : null}
                    {isRecurring ? (
                        <DateInput
                            name="sluttDato"
                            label="Sluttdato for henteplanen"
                            helperText={`Avtalen varer ${avtaleVarighet}`}
                            required
                        />
                    ) : null}
                    <TimeInput name="startTidspunkt" label="Starttidspunkt" required />
                    <TimeInput name="sluttTidspunkt" label="Sluttidspunkt" required />
                    <TextArea name="merknad" label="Merknader" />
                    <FormSubmitButton
                        label="Registrer ny henteplan"
                        isLoading={addHenteplanMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
