import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../../components/forms/ErrorMessages';
import { useSuccessToast } from '../../../../components/toasts/useSuccessToast';
import { ApiError } from '../../../../services/httpClient';
import { Unit } from '../Vektregistrering';
import {
    ApiVektregistrering,
    ApiVektregistreringBatchPost,
} from '../../../../services/vektregistrering/VektregistreringService';
import { useBatchAddVektregistrering } from '../../../../services/vektregistrering/useBatchAddVektregistrering';
import { ApiHenting } from '../../../../services/henting/HentingService';
import { RegistrerVektkategori } from './RegistrerVektkategori';

// NB! Setting the error messages used by yup
import '../../../../utils/forms/formErrorMessages';

interface VektFormData {
    [key: string]: VektObject;
}

interface VektObject {
    id: string;
    unit: string;
    value: number;
}

interface Props {
    /** By passing an existing Vektregistrering, the form will be in edit mode **/
    vektregistreringToEdit?: ApiVektregistrering;
    /** Callback that will fire if submission of form is successful: **/
    onSuccess?: () => void;
    henting: ApiHenting; //UUID
    setVekt: Dispatch<SetStateAction<Record<string, number>>>;
}

export const VektForm: React.FC<Props> = ({ henting, onSuccess, setVekt }) => {
    let validation = yup.object();

    const validationKategoriobjekt = (key: string) => {
        return {
            id: yup.string().required(),
            unit: yup.string().required(),
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

    const formMethods = useForm<VektFormData>({
        resolver: yupResolver(validationSchema),
    });

    const batchAddVektregistreringMutation = useBatchAddVektregistrering();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const transformFormData = (formData: VektFormData): ApiVektregistreringBatchPost => {
        const kategoriIder: string[] = [];
        const veiinger: number[] = [];

        for (const key in formData) {
            const vektObject: VektObject = formData[key];
            kategoriIder.push(vektObject.id);
            let vekt = vektObject.value;
            if (vektObject.unit === Unit[1]) vekt *= 1000;
            else if (vektObject.unit === Unit[2]) vekt /= 1000;
            else vekt *= 1;
            veiinger.push(vekt);
        }

        return {
            hentingId: henting.id,
            kategoriIds: kategoriIder,
            veiinger: veiinger,
        };
    };

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        batchAddVektregistrering(transformFormData(formData));
    });

    const batchAddVektregistrering = (newVektregistreringer: ApiVektregistreringBatchPost) => {
        batchAddVektregistreringMutation.mutate(newVektregistreringer, {
            onSuccess: () => {
                onApiSubmitSuccess('Vektregistreringene er gjennomført');
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
