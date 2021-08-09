import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../../components/forms/ErrorMessages';
import { useSuccessToast } from '../../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../../services/httpClient';
import {
    ApiVektregistrering,
    ApiVektregistreringBatchPatch,
    ApiVektregistreringBatchPost,
} from '../../../../services/vektregistrering/VektregistreringService';
import { useBatchAddVektregistrering } from '../../../../services/vektregistrering/useBatchAddVektregistrering';
import { ApiHenting } from '../../../../services/henting/HentingService';
import { RegistrerVektkategori } from './RegistrerVektkategori';

// NB! Setting the error messages used by yup
import '../../../../utils/forms/formErrorMessages';
import { useBatchUpdateVektregistrering } from '../../../../services/vektregistrering/useBatchUpdateVektregistrering';

interface VektFormData {
    [key: string]: VektObject;
}

interface VektObject {
    vektId?: string;
    kategoriId: string;
    value: number;
}

interface Props {
    /** By passing an existing Vektregistrering, the form will be in edit mode **/
    vektregistreringToEdit?: ApiVektregistrering[];
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
    henting: ApiHenting; //UUID
    setVekt: Dispatch<SetStateAction<Record<string, number>>>;
}

export const VektForm: React.FC<Props> = ({ vektregistreringToEdit, henting, onSuccess, setVekt }) => {
    let validation = yup.object();

    const validationKategoriobjekt = (key: string) => {
        return {
            id: yup.string().required(),
            value: yup
                .number()
                .typeError(`${key} må ha minst ett tall.`)
                .min(0, `${key} kan ikke være mindre enn 0.`)
                .label(`Mangler for kategorien: ${key}.`),
        };
    };

    const validationObject: any = {};
    let hasAndre = false;
    henting.kategorier.forEach((kategori) => {
        if (kategori.kategori.vektkategori) {
            const key = kategori.kategori.navn;
            validationObject[key] = yup.object(validationKategoriobjekt(key));
        } else hasAndre = true;
    });

    if (hasAndre) {
        const key = 'Andre ombruksvarer';
        validationObject[key] = yup.object(validationKategoriobjekt(key));
    }

    validation = validation.concat(yup.object(validationObject));

    const validationSchema = validation;

    const editVektFormData = (): VektFormData => {
        const vektFormData: VektFormData = {};
        vektregistreringToEdit?.forEach((vektregistrering) => {
            const key = vektregistrering.kategoriNavn;
            vektFormData[key] = {
                vektId: vektregistrering.id,
                kategoriId: vektregistrering.kategoriId,
                value: vektregistrering.vekt,
            };
        });
        return vektFormData;
    };

    const formMethods = useForm<VektFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: vektregistreringToEdit ? editVektFormData() : undefined,
    });

    const batchAddVektregistreringMutation = useBatchAddVektregistrering();
    const batchUpdateVektregistreringMutation = useBatchUpdateVektregistrering();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const transformPostFormData = (formData: VektFormData): ApiVektregistreringBatchPost => {
        const kategoriIder: string[] = [];
        const veiinger: number[] = [];

        for (const key in formData) {
            const vektObject: VektObject = formData[key];
            kategoriIder.push(vektObject.kategoriId);
            veiinger.push(vektObject.value);
        }

        return {
            hentingId: henting.id,
            kategoriIds: kategoriIder,
            veiinger: veiinger,
        };
    };

    const transformPatchFormData = (formData: VektFormData): ApiVektregistreringBatchPatch => {
        const registreringIder: string[] = [];
        const veiinger: number[] = [];

        for (const key in formData) {
            const vektObject: VektObject = formData[key];
            vektObject.vektId ? registreringIder.push(vektObject.vektId) : null;
            veiinger.push(vektObject.value);
        }

        return {
            hentingId: henting.id,
            vektregistreringIds: registreringIder,
            veiinger: veiinger,
        };
    };

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        const vektregistrering = vektregistreringToEdit
            ? transformPatchFormData(formData)
            : transformPostFormData(formData);

        if (vektregistreringToEdit) {
            batchUpdateVektregistrering(vektregistrering as ApiVektregistreringBatchPatch);
        } else {
            batchAddVektregistrering(vektregistrering as ApiVektregistreringBatchPost);
        }
    });

    const batchAddVektregistrering = (newVektregistreringer: ApiVektregistreringBatchPost) => {
        batchAddVektregistreringMutation.mutate(newVektregistreringer, {
            onSuccess: () => {
                onApiSubmitSuccess('Vektregistreringene er gjennomført');
            },
            onError: onApiSubmitError,
        });
    };

    const batchUpdateVektregistrering = (updatedVektregistreringer: ApiVektregistreringBatchPatch) => {
        batchUpdateVektregistreringMutation.mutate(updatedVektregistreringer, {
            onSuccess: () => {
                onApiSubmitSuccess('Endringen for vektregistreringen er gjennomført');
            },
            onError: onApiSubmitError,
        });
    };

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
            <form id="vekt-form" onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <RegistrerVektkategori henting={henting} setVekt={setVekt} />
                </Stack>
            </form>
        </FormProvider>
    );
};
