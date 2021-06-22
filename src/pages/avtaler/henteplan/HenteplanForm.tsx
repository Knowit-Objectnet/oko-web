import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import {
    ApiHenteplan,
    ApiHenteplanPatch,
    ApiHenteplanPost,
    HenteplanFrekvens,
    Weekday,
} from '../../../services/henteplan/HenteplanService';
import { useAddHenteplan } from '../../../services/henteplan/useAddHenteplan';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/radio/RadiobuttonGroup';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { StasjonSelect } from '../../../components/forms/StasjonSelect';
import { TextArea } from '../../../components/forms/TextArea';
import { formatDate } from '../../../utils/formatDateTime';
import { AVTALE_TYPE, getAvtaleTitle } from '../avtale/AvtaleInfoItem';
import { mergeDateWithTime } from '../../../utils/forms/mergeDateWithTime';
import { getHenteplanValidationSchema } from './henteplanFormSchema';
import { FormInfoBody, FormInfoHeading, FormInfoSection } from '../../../components/forms/FormInfoSection';
import { toISOLocalString } from '../../../utils/localDateISO';
import { parseISO } from 'date-fns';
import { KategoriSelect } from '../../../components/forms/KategoriSelect';
import { HenteplanFormTidspunkt } from './HenteplanFormTidspunkt';
import { HenteplanFormDato } from './HenteplanFormDato';
import { ApiError } from '../../../services/httpClient';
import { useUpdateHenteplan } from '../../../services/henteplan/useUpdateHenteplan';

// NB! Setting the global error messages used by yup
import '../../../utils/forms/formErrorMessages';

export const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

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

const createHenteplan = (data: HenteplanFormData): Omit<ApiHenteplanPost, 'avtaleId'> => {
    const startTidspunkt = toISOLocalString(mergeDateWithTime(data.startDato, data.startTidspunkt));
    const sluttTidspunkt = toISOLocalString(mergeDateWithTime(data.sluttDato || data.startDato, data.sluttTidspunkt));

    return {
        ...data,
        startTidspunkt,
        sluttTidspunkt,
    };
};

interface Props {
    avtale: ApiAvtale;
    /**  By passing an existing Henteplan, the form will be in edit mode **/
    henteplanToEdit?: ApiHenteplan;
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

export const HenteplanForm: React.FC<Props> = ({ avtale, henteplanToEdit, onSuccess }) => {
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
    const updateHenteplanMutation = useUpdateHenteplan();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (henteplanToEdit) {
            updateHenteplan({ ...createHenteplan(formData), id: henteplanToEdit.id });
        } else {
            addHenteplan({ ...createHenteplan(formData), avtaleId: avtale.id });
        }
    });

    const addHenteplan = (newHenteplan: ApiHenteplanPost) =>
        addHenteplanMutation.mutate(newHenteplan, {
            onSuccess: () => {
                onApiSubmitSuccess(`Henteplanen ble registrert`);
            },
            onError: onApiSubmitError,
        });

    const updateHenteplan = (updatedHenteplan: ApiHenteplanPatch) =>
        updateHenteplanMutation.mutate(updatedHenteplan, {
            onSuccess: () => {
                onApiSubmitSuccess(`Henteplanen ble oppdatert`);
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
                        label="Registrer ny henteplan"
                        isLoading={addHenteplanMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
