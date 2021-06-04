import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { DateInput } from '../../../components/forms/DateInput';
import { formatISO } from 'date-fns';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiAvtalePost, AvtaleType } from '../../../services/avtale/AvtaleService';
import { transformDate } from '../../../utils/forms/transformDate';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useAddAvtale } from '../../../services/avtale/useAddAvtale';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

interface AvtaleFormData {
    type: AvtaleType;
    startDato: Date;
    sluttDato: Date;
}

const avtaleTypeOptions: Array<RadioOption<AvtaleType>> = [
    { value: 'FAST', label: 'Fast' },
    { value: 'ANNEN', label: 'Annen' },
];

const validationSchema = yup.object().shape({
    startDato: yup.date().label('startdato for avtalen').transform(transformDate).required().nullable(),
    sluttDato: yup
        .date()
        .label('sluttdato for avtalen')
        .transform(transformDate)
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
    partner: ApiPartner;
    onSuccess?: () => void;
}

export const AvtaleForm: React.FC<Props> = ({ partner, onSuccess }) => {
    const formMethods = useForm<AvtaleFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addAvtaleMutation = useAddAvtale();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        const newAvtale: ApiAvtalePost = {
            aktorId: partner.id,
            startDato: formatISO(data.startDato, { representation: 'date' }),
            sluttDato: formatISO(data.sluttDato, { representation: 'date' }),
            type: data.type,
            // TODO: remove when this is not required by API
            henteplaner: [],
        };

        addAvtaleMutation.mutate(newAvtale, {
            onSuccess: () => {
                showSuccessToast({ title: `Det ble registrert en ny avtale for ${partner.navn}` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO: get details from error and set appropriate message.
                //  If caused by user: set message to correct field
                setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <DateInput name="startDato" label="Startdato for avtalen" required />
                    <DateInput name="sluttDato" label="Sluttdato for avtalen" required />
                    <RadiobuttonGroup name="type" label="Type avtale" options={avtaleTypeOptions} required />
                    <FormSubmitButton
                        label="Registrer ny avtale"
                        isLoading={addAvtaleMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
