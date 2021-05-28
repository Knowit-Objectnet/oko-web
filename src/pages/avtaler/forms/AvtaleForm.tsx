import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AvtaleType } from '../../../types';
import { Stack } from '@chakra-ui/react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { AllFormErrorMessages } from '../../../components/forms/AllFormErrorMessages';
import { ApiPartner } from '../../../services-new/AktorService';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { upperFirst } from 'lodash';
import { ApiAvtalePost } from '../../../services-new/AvtaleService';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';

const avtaleTypeOptions: Array<SelectOption<AvtaleType>> = [
    { value: 'FAST', label: 'Fast' },
    { value: 'ANNEN', label: 'Annen' },
];

yup.setLocale({
    string: {
        min: ({ label, min }: { label: string; min: number }) => `${upperFirst(label)} må bestå av minst ${min} tegn`,
        max: ({ label, max }: { label: string; max: number }) =>
            `${upperFirst(label)} må være ikke være lenger enn ${max} tegn`,
    },
    mixed: {
        required: 'Du må oppgi ${label}',
        oneOf: 'Du må velge ${label}',
    },
});

const validationSchema = yup.object().shape({
    type: yup
        .mixed()
        .label('type for avtalen')
        .required()
        .oneOf(Object.values(avtaleTypeOptions).map((avtaleType) => avtaleType.value)),
});

interface Props {
    partner: ApiPartner;
    afterSubmit?: () => void;
}

export const AvtaleForm: React.FC<Props> = ({ partner, afterSubmit }) => {
    const formMethods = useForm<ApiAvtalePost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const handleAvtaleSubmission = formMethods.handleSubmit((data) => {
        console.log({ ...data, aktorId: partner.id });
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
                    <AllFormErrorMessages />
                    <FormSubmitButton label="Registrer ny avtale" />
                </Stack>
            </form>
        </FormProvider>
    );
};
