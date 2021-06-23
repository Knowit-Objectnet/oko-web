import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/radio/RadiobuttonGroup';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';
import { TextArea } from '../../../components/forms/TextArea';
import { formatDate } from '../../../utils/formatDateTime';
import { AVTALE_TYPE, getAvtaleTitle } from '../avtale/AvtaleInfoItem';
import { getHenteplanValidationSchema } from './henteplanFormSchema';
import { FormInfoBody, FormInfoHeading, FormInfoSection } from '../../../components/forms/FormInfoSection';
import { parseISO } from 'date-fns';
import { KategoriSelect } from '../../../components/forms/KategoriSelect';
import { HenteplanFormTidspunkt } from './HenteplanFormTidspunkt';
import { HenteplanFormDato } from './HenteplanFormDato';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the global error messages used by yup
import '../../../utils/forms/formErrorMessages';

export const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

interface HenteplanFormBase {
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    ukedag?: Weekday;
    kategorier: Array<string>;
    merknad?: string;
}

export interface HenteplanFormData extends HenteplanFormBase {
    startDato: Date;
    sluttDato?: Date;
    startTidspunkt: Date;
    sluttTidspunkt: Date;
}

interface HenteplanFormDefaultValues extends Partial<HenteplanFormBase> {
    startDato?: string;
    sluttDato?: string;
    startTidspunkt?: string;
    sluttTidspunkt?: string;
}

export interface Props {
    avtale: ApiAvtale;
    defaultFormValues: HenteplanFormDefaultValues;
    onSubmit: (formData: HenteplanFormData) => Promise<ApiHenteplan>;
    submitLoading: boolean;
    isEditing?: boolean;
}

export const HenteplanForm: React.FC<Props> = ({ avtale, defaultFormValues, onSubmit, submitLoading, isEditing }) => {
    const validationSchema = getHenteplanValidationSchema(avtale);
    const formMethods = useForm<HenteplanFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultFormValues,
        // The following line unregisters fields that are conditionally hidden (e.g. by changing "Frekvens" in this form).
        //  This fixes a problem where errors for hidden fields are not cleared from the react-hook-form errors object.
        //  But this setting comes with some caveats: https://react-hook-form.com/api/useform (see "shouldUnregister" section)
        shouldUnregister: true,
    });

    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit(async (formData) => {
        setApiOrNetworkError(undefined);
        onSubmit(formData).catch(onApiSubmitError);
    });

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
    };

    const frekvens = formMethods.watch('frekvens', undefined);
    const isRecurring = frekvens && frekvens !== 'ENKELT';
    const avtaleVarighet = `fra ${formatDate(parseISO(avtale.startDato))} til ${formatDate(
        parseISO(avtale.sluttDato),
    )}`;

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <FormInfoSection>
                        <FormInfoHeading>Gjelder for {getAvtaleTitle(avtale).toLowerCase()}:</FormInfoHeading>
                        <FormInfoBody>
                            {AVTALE_TYPE[avtale.type]} {avtaleVarighet}
                        </FormInfoBody>
                    </FormInfoSection>
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    {/* TODO: show station name, not dropdown if isEditing */}
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
                    {frekvens ? (
                        <HenteplanFormDato
                            isInterval={isRecurring}
                            helperText={`Må være innenfor avtalens varighet (${avtaleVarighet})`}
                        />
                    ) : null}
                    <HenteplanFormTidspunkt frekvensIsRecurring={isRecurring} />
                    <KategoriSelect
                        name="kategorier"
                        label="Kategorier"
                        helperText="Hvilken type varer skal partneren kunne hente?"
                        required
                    />
                    <TextArea name="merknad" label="Merknader" />
                    <FormSubmitButton
                        label={isEditing ? 'Lagre endringer' : 'Registrer ny henteplan'}
                        isLoading={submitLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
