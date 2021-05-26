import * as React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../components/forms/TextInput';
import { PartnerStorrelse } from '../../types';
import { Button } from '@chakra-ui/react';
import { Select, SelectOption } from '../../components/forms/Select';

yup.setLocale({
    mixed: {
        required: '${label} er påkrevd',
        oneOf: 'Det må velges en ${label}',
    },
});

const storrelseOptions: Array<SelectOption<PartnerStorrelse>> = [
    { value: 'LITEN', label: 'Liten' },
    { value: 'MIDDELS', label: 'Middels' },
    { value: 'STOR', label: 'Stor' },
];

const validationSchema = yup.object().shape({
    navn: yup.string().label('Navn for samarbeidspartneren').required().min(2),
    // ideell: yup.boolean().label('Om partneren er en ideell organisasjon').required(),
    storrelse: yup
        .mixed<PartnerStorrelse>()
        .label('størrelse på partneren')
        .required()
        .oneOf(storrelseOptions.map(({ value }) => value)),
});

interface Props {
    afterSubmit?: () => void;
}

export const AddPartnerForm: React.FC<Props> = ({ afterSubmit }) => {
    const formMethods = useForm<{ navn: string; storrelse: PartnerStorrelse }>({
        resolver: yupResolver(validationSchema),
    });

    const handleNewPartnerSubmission = formMethods.handleSubmit((data) => {
        console.log(data);
        afterSubmit?.();
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleNewPartnerSubmission}>
                <TextInput name="navn" label="Navn på organisasjonen" />
                <Select name="storrelse" label="Størrelse" options={storrelseOptions} />
                <Button type="submit" width="full">
                    Registrer ny partner
                </Button>
            </form>
        </FormProvider>
    );
};
