import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../services/httpClient';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';
import { ApiKategori } from '../../../services/kategori/KategoriService';
import { useAddKategori } from '../../../services/kategori/useAddKategori';
import { useUpdateKategori } from '../../../services/kategori/useUpdateKategori';
import { Unit } from '../registrering/Vektregistrering';

interface VektFormData {
    id: string;
    name: string;
    unit: Unit;
    value: number;
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

export const VektForm: React.FC<Props> = ({ onSuccess }) => {
    const formMethods = useForm<VektFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: undefined,
    });

    const addKategoriMutation = useAddKategori();
    const updateKategoriMutation = useUpdateKategori();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);
        /*
        addKategori({
            ...formData,
        });
        */
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

                    <Button>RANDOM BUTTON</Button>

                    {/*
                    <FormSubmitButton
                        label={kategoriToEdit ? 'Lagre endringer' : 'Registrer ny kategori'}
                        isLoading={updateKategoriMutation.isLoading || addKategoriMutation.isLoading}
                        loadingText="Lagrer..."
                    />
                    */}
                </Stack>
            </form>
        </FormProvider>
    );
};
