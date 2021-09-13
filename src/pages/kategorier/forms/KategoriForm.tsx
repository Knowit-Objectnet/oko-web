import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../../components/forms/input/Input';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { ApiKategori, ApiKategoriPatch, ApiKategoriPost } from '../../../services/kategori/KategoriService';
import { useAddKategori } from '../../../services/kategori/useAddKategori';
import { useUpdateKategori } from '../../../services/kategori/useUpdateKategori';
import { WarningBody, WarningContainer, WarningTitle } from '../../../components/forms/Warning';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';

interface KategoriFormData {
    navn: string;
    vektkategori: string;
}
const vektRegistreringOptions: Array<RadioOption<string>> = [
    { value: 'true', label: 'Ja' },
    { value: 'false', label: 'Nei' },
];

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på kategori').required().min(2),
    vektkategori: yup
        .mixed()
        .label('om kategorien skal registrere vekt')
        .required()
        .oneOf(vektRegistreringOptions.map((vektRegistrering) => vektRegistrering.value)),
});

interface Props {
    /** By passing an existing kategori, the form will be in edit mode **/
    kategori?: ApiKategori;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const KategoriForm: React.FC<Props> = ({ kategori, onSuccess }) => {
    const formMethods = useForm<KategoriFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: kategori
            ? {
                  navn: kategori.navn,
                  vektkategori: kategori.vektkategori.toString(),
              }
            : undefined,
    });

    const addKategoriMutation = useAddKategori();
    const updateKategoriMutation = useUpdateKategori();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();
    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (kategori) {
            updateKategori({
                id: kategori.id,
                navn: formData.navn,
                vektkategori: formData.vektkategori === 'true',
            });
        } else {
            addKategori({
                navn: formData.navn,
                vektkategori: formData.vektkategori === 'true',
            });
        }
    });

    const addKategori = (newKategori: ApiKategoriPost) =>
        addKategoriMutation.mutate(newKategori, {
            onSuccess: () => {
                onApiSubmitSuccess(`Kategori ${newKategori.navn} ble registrert`);
            },
            onError: onApiSubmitError,
        });

    const updateKategori = (updateKategori: ApiKategoriPatch) =>
        updateKategoriMutation.mutate(updateKategori, {
            onSuccess: () => {
                onApiSubmitSuccess(`Endringene ble lagret for ${updateKategori.navn}`);
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
                    {kategori ? (
                        <>
                            <WarningContainer variant="warning">
                                <WarningTitle title="Advarsel" />
                                <WarningBody>
                                    Ved endring av navn vil vektrapporter tilknyttet denne kategorien også endres.
                                    Dersom nytt kategorinavn har en annen betydning enn nåværende navn, bør det vurderes
                                    å opprette en ny kategori.
                                </WarningBody>
                                <WarningBody>
                                    For eksempel bør man vurdere opprettelse av ny kategori ved navnebytte fra
                                    &quot;Sport- og friluftsutstyr&quot; til &quot;Ski&quot;.
                                </WarningBody>
                            </WarningContainer>
                            <Input name="navn" label="Navn på kategori" required />
                            <RadiobuttonGroup
                                name="vektkategori"
                                label="Skal kategori registrere vekt?"
                                options={vektRegistreringOptions}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <Input name="navn" label="Navn på kategori" required />
                            <RadiobuttonGroup
                                name="vektkategori"
                                label="Skal kategori registrere vekt?"
                                options={vektRegistreringOptions}
                                required
                            />
                        </>
                    )}

                    <FormSubmitButton
                        label={kategori ? 'Lagre endringer' : 'Registrer ny kategori'}
                        isLoading={updateKategoriMutation.isLoading || addKategoriMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
