import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { DatePicker } from '../../../components/forms/DatePicker';
import { formatISO, parse } from 'date-fns';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { AvtaleType } from '../../../services/avtale/AvtaleService';

// NB! Setting the error messages used by yup
import '../../../components/forms/formErrorMessages';

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
    startDato: yup
        .date()
        .label('startdato for avtalen')
        .transform((value, originalValue) => {
            console.log(value);
            if (isDate(value) && isValid(value)) {
                return value;
            }
            const parsed = parse(originalValue, 'dd/MM/yyyy', new Date());
            console.log(parsed);
            return isValid(parsed) ? parsed : null;
        })
        .required()
        .nullable(),
});

interface Props {
    partner: ApiPartner;
    afterSubmit?: () => void;
}

interface AvtaleFormData {
    type: AvtaleType;
    startDato: Date;
    // sluttDato: Date; //LocalDate
}

export const AvtaleForm: React.FC<Props> = ({ partner, afterSubmit }) => {
    const formMethods = useForm<AvtaleFormData>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const handleAvtaleSubmission = formMethods.handleSubmit((data) => {
        console.log(data.startDato);
        console.log({ startDato: formatISO(data.startDato), type: data.type, aktorId: partner.id });
        // TODO: submit data to API with useMutation (react-query) (post or patch, depending on form is in edit mode)
        //  - pass loading state to button / disable form
        //  - pass errors from backend response (onError react-query callback):
        afterSubmit?.();
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleAvtaleSubmission}>
                <Stack direction="column" spacing="8">
                    <RequiredFieldsInstruction />
                    <Select
                        name="type"
                        label="Type avtale"
                        options={avtaleTypeOptions}
                        placeholder="Velg en type"
                        required
                    />
                    <DatePicker name="startDato" label="Startdato for avtalen" required />
                    {/*TODO: form errors displayed even if no errors */}
                    <AllFormErrorMessages />
                    <FormSubmitButton label="Registrer ny avtale" loadingText="Vennligst vent..." />
                </Stack>
            </form>
        </FormProvider>
    );
};
