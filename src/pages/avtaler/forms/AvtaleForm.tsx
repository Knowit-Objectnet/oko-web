import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { DateInput } from '../../../components/forms/DateInput';
import { formatISO } from 'date-fns';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiAvtalePost, AvtaleType } from '../../../services/avtale/AvtaleService';
import { transformDate } from '../../../utils/forms/transformDate';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useAddAvtale } from '../../../services/avtale/useAddAvtale';
import { useState } from 'react';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const avtaleTypeOptions: Array<SelectOption<AvtaleType>> = [
    { value: 'FAST', label: 'Fast' },
    { value: 'ANNEN', label: 'Annen' },
];

const validationSchema = yup.object().shape({
    type: yup
        .mixed()
        .label('type for avtalen')
        .required()
        .oneOf(Object.values(avtaleTypeOptions).map((avtaleType) => avtaleType.value)),
    startDato: yup.date().label('startdato for avtalen').transform(transformDate).required().nullable(),
    sluttDato: yup
        .date()
        .label('sluttdato for avtalen')
        .transform(transformDate)
        .required()
        .min(yup.ref('startDato'), 'Sluttdato kan ikke være før startdato')
        .nullable(),
});

interface Props {
    partner: ApiPartner;
    onSuccess?: () => void;
}

interface AvtaleFormData {
    type: AvtaleType;
    startDato: Date;
    sluttDato: Date;
}

export const AvtaleForm: React.FC<Props> = ({ partner, onSuccess }) => {
    const formMethods = useForm<AvtaleFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addAvtaleMutation = useAddAvtale();
    const showSuccessToast = useSuccessToast();
    const [apiError, setApiError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiError(undefined);

        const newAvtale: ApiAvtalePost = {
            aktorId: partner.id,
            startDato: formatISO(data.startDato),
            sluttDato: formatISO(data.sluttDato),
            type: data.type,
        };

        addAvtaleMutation.mutate(newAvtale, {
            onSuccess: () => {
                console.log('det gikk bra å opprette ny avtale', newAvtale);
                showSuccessToast({ title: `Det ble registrert en ny avtale for ${partner.navn}` });
                onSuccess?.();
            },
            onError: (error) => {
                // TODO - fix error message
                console.log(error);
                setApiError(error.message);
            },
        });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    {/*TODO: Display API errors*/}
                    <AllFormErrorMessages />
                    <Select
                        name="type"
                        label="Type avtale"
                        options={avtaleTypeOptions}
                        placeholder="Velg en type"
                        required
                    />
                    <DateInput
                        name="startDato"
                        // TODO: for browsers that do not support date inputs
                        // placeholder="åååå-mm-dd"
                        // helperText="Skriv inn dato med dette formatet: åååå-mm-dd"
                        label="Startdato for avtalen"
                        required
                    />
                    <DateInput
                        name="sluttDato"
                        // TODO: for browsers that do not support date inputs
                        // placeholder="åååå-mm-dd"
                        // helperText="Skriv inn dato med dette formatet: åååå-mm-dd"
                        label="Sluttdato for avtalen"
                        required
                    />
                    <FormSubmitButton label="Registrer ny avtale" loadingText="Vennligst vent..." />
                </Stack>
            </form>
        </FormProvider>
    );
};
