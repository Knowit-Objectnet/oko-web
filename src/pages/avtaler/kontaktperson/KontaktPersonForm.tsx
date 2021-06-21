import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiKontakt, ApiKontaktPatch, ApiKontaktPost } from '../../../services/aktor/KontaktService';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { Input } from '../../../components/forms/input/Input';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useAddKontakt } from '../../../services/aktor/useAddKontakt';
import { upperFirst } from 'lodash';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useUpdateKontakt } from '../../../services/aktor/useUpdateKontakt';
import { ApiError } from '../../../services/httpClient';
import { transformToNorwegianPhone } from '../../../utils/forms/transformToNorwegianPhone';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const validationSchema = yup.object().shape({
    // TODO: validation of first and last name (both required) using `matches(regex pattern)`
    navn: yup.string().label('navn på kontaktpersonen').trim().required().min(5),
    rolle: yup.string().label('kontaktpersonens rolle').trim().required().min(5),
    telefon: yup
        .string()
        .label('telefonnummer for kontaktpersonen')
        .transform(transformToNorwegianPhone)
        .matches(/^\+47[4|9]\d{7}$/, {
            message: ({ label }: { label: string }) =>
                `${upperFirst(label)} må være et gyldig, norsk mobiltelefonnummer (8 siffer, starter med 4 eller 9)`,
            excludeEmptyString: true,
        }),
    epost: yup.string().label('e-postadresse for kontaktpersonen').trim().email().nullable(),
});

interface Props {
    /** Callback that will fire if registration is successful: **/
    onSuccess: () => void;
}

interface AddModeProps extends Props {
    /**  Partner is only required for adding Kontakt, and not allowed in edit mode. **/
    partner: ApiPartner;
    kontaktToEdit?: never;
}

interface EditModeProps extends Props {
    partner?: never;
    /**  By passing an existing Kontakt, the form will be in edit mode (not allowed in add mode) **/
    kontaktToEdit: ApiKontakt;
}

export const KontaktPersonForm: React.FC<EditModeProps | AddModeProps> = ({ partner, kontaktToEdit, onSuccess }) => {
    const formMethods = useForm<ApiKontaktPost>({
        resolver: yupResolver(validationSchema),
        defaultValues: kontaktToEdit
            ? {
                  navn: kontaktToEdit.navn,
                  rolle: kontaktToEdit.rolle,
                  telefon: kontaktToEdit.telefon?.replace(/^\+47/, ''),
                  epost: kontaktToEdit.epost,
              }
            : undefined,
    });

    const addKontaktMutation = useAddKontakt();
    const updateKontaktMutation = useUpdateKontakt();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (kontaktToEdit) {
            updateKontakt({
                ...formData,
                id: kontaktToEdit.id,
            });
        } else if (partner) {
            addKontakt({
                ...formData,
                aktorId: partner.id,
            });
        }
    });

    const addKontakt = (newKontakt: ApiKontaktPost) =>
        addKontaktMutation.mutate(newKontakt, {
            onSuccess: () => {
                onApiSubmitSuccess(`${newKontakt.navn} ble registrert som kontaktperson for ${partner?.navn}`);
            },
            onError: onApiSubmitError,
        });

    const updateKontakt = (updatedKontakt: ApiKontaktPatch) =>
        updateKontaktMutation.mutate(updatedKontakt, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret for ${updatedKontakt.navn}`);
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
                    <Input name="navn" label="Navn" helperText="Skriv inn fullt navn (for- og etternavn)" required />
                    <Input name="rolle" label="Rolle" required />
                    <Input
                        type="phone"
                        name="telefon"
                        label="Mobiltelefon"
                        helperText="Må være et gyldig, norsk mobiltelefonnummer"
                        leftAddon="+47"
                    />
                    <Input type="email" name="epost" label="E-postadresse" required={false} />
                    <FormSubmitButton
                        label={kontaktToEdit ? 'Lagre endringer' : 'Registrer ny kontaktperson'}
                        isLoading={updateKontaktMutation.isLoading || addKontaktMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
