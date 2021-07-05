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

interface KategoriFormData {
    navn: string;
}

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på kategori').required().min(2),
});

interface Props {
    /** By passing an existing kategori, the form will be in edit mode **/
    kategoriToEdit?: ApiKategori;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
}

export const KategoriForm: React.FC<Props> = ({ kategoriToEdit, onSuccess }) => {
    const formMethods = useForm<KategoriFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: kategoriToEdit
            ? {
                  navn: kategoriToEdit.navn,
              }
            : undefined,
    });

    const addKategoriMutation = useAddKategori();
    const updateKategoriMutation = useUpdateKategori();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        if (kategoriToEdit) {
            updateKategori({
                id: kategoriToEdit.id,
                navn: formData.navn,
            });
        } else {
            addKategori({
                ...formData,
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

    const instructions: string[] = ['Ved endring av navn vil vektrapporter tilknyttet denne kategorien også endres.'];

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction instructions={kategoriToEdit ? instructions : undefined} />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn på kategori" required />

                    <FormSubmitButton
                        label={kategoriToEdit ? 'Lagre endringer' : 'Registrer ny kategori'}
                        isLoading={updateKategoriMutation.isLoading || addKategoriMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
