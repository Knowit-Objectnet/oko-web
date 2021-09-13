import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { formatISO } from 'date-fns';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiAvtale, ApiAvtalePatch, ApiAvtalePost, AvtaleType } from '../../../services/avtale/AvtaleService';
import { transformStringToDate } from '../../../utils/forms/transformStringToDate';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useAddAvtale } from '../../../services/avtale/useAddAvtale';
import { ApiError } from '../../../services/httpClient';
import { useUpdateAvtale } from '../../../services/avtale/useUpdateAvtale';
import { AvtaleFormSluttDato } from './AvtaleFormSluttDato';
import { AvtaleFormStartDato } from './AvtaleFormStartDato';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { Input } from '../../../components/forms/input/Input';

interface AvtaleFormData {
    type: AvtaleType;
    startDato: Date;
    sluttDato: Date;
    saksnummer?: string;
}

const avtaleTypeOptions: Array<RadioOption<AvtaleType>> = [
    { value: 'FAST', label: 'Fast' },
    { value: 'ANNEN', label: 'Annen' },
];

const validationSchema = yup.object().shape({
    startDato: yup.date().label('startdato for avtalen').transform(transformStringToDate).required().nullable(),
    sluttDato: yup
        .date()
        .label('sluttdato for avtalen')
        .transform(transformStringToDate)
        .required()
        .min(yup.ref('startDato'), 'Sluttdato kan ikke være før startdato')
        .nullable(),
    type: yup
        .mixed()
        .label('type for avtalen')
        .required()
        .oneOf(avtaleTypeOptions.map((avtaleType) => avtaleType.value)),
});

interface Props {
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

interface AddModeProps extends Props {
    /**  Partner is only required for adding Avtale, and not allowed in edit mode. **/
    partner?: ApiPartner;
    avtale?: never;
}

interface EditModeProps extends Props {
    partner?: never;
    /**  By passing an existing Kontakt, the form will be in edit mode (not allowed in add mode) **/
    avtale: ApiAvtale;
}

export const AvtaleForm: React.FC<AddModeProps | EditModeProps> = ({ partner, avtale, onSuccess }) => {
    const formMethods = useForm<AvtaleFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: avtale
            ? {
                  type: avtale.type,
                  startDato: avtale.startDato,
                  sluttDato: avtale.sluttDato,
                  saksnummer: avtale.saksnummer,
              }
            : undefined,
    });

    const addAvtaleMutation = useAddAvtale();
    const updateAvtaleMutation = useUpdateAvtale();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        const avtaleData: Omit<ApiAvtalePost, 'aktorId'> = {
            startDato: formatISO(formData.startDato, { representation: 'date' }),
            sluttDato: formatISO(formData.sluttDato, { representation: 'date' }),
            type: formData.type,
            saksnummer: formData.saksnummer,
        };

        if (avtale) {
            updateAvtale({
                ...avtaleData,
                id: avtale.id,
            });
        } else if (partner) {
            addAvtale({
                ...avtaleData,
                aktorId: partner.id,
            });
        }
    });

    const addAvtale = (newAvtale: ApiAvtalePost) =>
        addAvtaleMutation.mutate(newAvtale, {
            onSuccess: () => {
                onApiSubmitSuccess(`Det ble registrert en ny avtale for ${partner?.navn}`);
            },
            onError: onApiSubmitError,
        });

    const updateAvtale = (updatedAvtale: ApiAvtalePatch) =>
        updateAvtaleMutation.mutate(updatedAvtale, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene for avtalen ble lagret`);
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

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <AvtaleFormStartDato avtaleToEdit={avtale} />
                    <AvtaleFormSluttDato avtaleToEdit={avtale} />
                    <RadiobuttonGroup name="type" label="Type avtale" options={avtaleTypeOptions} required />
                    <Input name="saksnummer" label="Saksnummer" />
                    <FormSubmitButton
                        label={avtale ? 'Lagre endringer' : 'Registrer ny avtale'}
                        isLoading={updateAvtaleMutation.isLoading || addAvtaleMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
