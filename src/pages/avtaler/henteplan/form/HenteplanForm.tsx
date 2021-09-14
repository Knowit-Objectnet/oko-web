import * as React from 'react';
import { useState } from 'react';
import { ApiAvtale } from '../../../../services/avtale/AvtaleService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../../services/henteplan/HenteplanService';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../../components/forms/ErrorMessages';
import { FormSubmitButton } from '../../../../components/forms/FormSubmitButton';
import { TextArea } from '../../../../components/forms/TextArea';
import { getHenteplanValidationSchema } from './henteplanFormSchema';
import { KategoriSelect } from '../../../../components/forms/KategoriSelect';
import { HenteplanFormTidspunkt } from './HenteplanFormTidspunkt';
import { HenteplanFormDato } from './HenteplanFormDato';
import { ApiError } from '../../../../services/httpClient';
import { HenteplanFormStasjon } from './HenteplanFormStasjon';
import { HenteplanFormAvtaleInfo } from './HenteplanFormAvtaleInfo';
import { HenteplanFormFrekvens } from './HenteplanFormFrekvens';
import { useSuccessToast } from '../../../../components/toasts/useSuccessToast';

// NB! Setting the global error messages used by yup
import '../../../../utils/forms/formErrorMessages';

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
    onSuccess?: () => void;
    submitLoading: boolean;
    isEditing?: boolean;
}

export const HenteplanForm: React.FC<Props> = ({
    avtale,
    defaultFormValues,
    onSubmit,
    onSuccess,
    submitLoading,
    isEditing,
}) => {
    const validationSchema = getHenteplanValidationSchema(avtale, isEditing);
    const formMethods = useForm<HenteplanFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultFormValues,
        // The following line unregisters fields that are conditionally hidden (e.g. by changing "Frekvens" in this form).
        //  This fixes a problem where errors for hidden fields are not cleared from the react-hook-form errors object.
        //  But this setting comes with some caveats: https://react-hook-form.com/api/useform (see "shouldUnregister" section)
        shouldUnregister: true,
    });

    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);
        onSubmit(formData)
            .then(() => onApiSubmitSuccess(`Henteplanen ble ${isEditing ? 'oppdatert' : 'registrert'}.`))
            .catch(onApiSubmitError);
    });

    const showSuccessToast = useSuccessToast();
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

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <HenteplanFormAvtaleInfo avtale={avtale} />
                    <RequiredFieldsInstruction />
                    <HenteplanFormStasjon stasjonId={defaultFormValues.stasjonId} />
                    <HenteplanFormFrekvens />
                    {frekvens ? <HenteplanFormDato isInterval={isRecurring} avtale={avtale} /> : null}
                    <HenteplanFormTidspunkt frekvensIsRecurring={isRecurring} />
                    <KategoriSelect
                        name="kategorier"
                        label="Kategorier"
                        helperText="Hvilken type varer skal partneren kunne hente?"
                        required
                    />
                    <TextArea name="merknad" label="Merknader" />
                    <ErrorMessages globalError={apiOrNetworkError} />
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
