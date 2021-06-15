import * as React from 'react';
import * as yup from 'yup';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiKontaktPost } from '../../../services/aktor/KontaktService';
import { Stack } from '@chakra-ui/react';
import { RequiredFieldsInstruction } from '../../../components/forms/RequiredFieldsInstruction';
import { ErrorMessages } from '../../../components/forms/ErrorMessages';
import { Input } from '../../../components/forms/Input';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { useState } from 'react';
import { useAddKontakt } from '../../../services/aktor/useAddKontakt';
import { upperFirst } from 'lodash';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på kontaktpersonen').trim().required().min(5), // TODO: regex for og etternavn
    rolle: yup.string().label('kontaktpersonens rolle').trim().required().min(5),
    telefon: yup
        .string()
        .label('telefonnummer for kontaktpersonen')
        .trim()
        .matches(/^(\+?(00)?(47))?[2-9]\d{7}$/, {
            message: ({ label }: { label: string }) => `${upperFirst(label)} må være et gyldig, norsk telefonnummer`,
            excludeEmptyString: true,
        }),
    epost: yup.string().label('e-postadresse for kontaktpersonen').trim().email(),
});

interface Props {
    partner: ApiPartner;
    /** Callback that will fire if registration is successful: **/
    onSuccess: () => void;
}

export const KontaktpersonForm: React.FC<Props> = ({ partner, onSuccess }) => {
    const formMethods = useForm<ApiKontaktPost>({
        resolver: yupResolver(validationSchema),
        // TODO: if form is in edit mode: pass original values as "defaultValues" here
    });

    const addKontaktMutation = useAddKontakt();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        setApiOrNetworkError(undefined);

        const newKontakt: ApiKontaktPost = {
            ...data,
            aktorId: partner.id,
        };

        console.log(data);
        console.log(newKontakt);

        addKontaktMutation.mutate(newKontakt, {
            onSuccess: () => {
                showSuccessToast({ title: `${data.navn} ble registrert som kontaktperson for ${partner.navn}` });
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
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn" helperText="Skriv inn fullt navn (for- og etternavn)" required />
                    <Input name="rolle" label="Rolle" required />
                    <Input
                        type="phone"
                        name="telefon"
                        label="Telefonnummer"
                        helperText="Må være et norsk telefonnummer"
                    />
                    <Input type="email" name="epost" label="E-postadresse" required={false} />
                    <FormSubmitButton
                        label="Registrer ny kontaktperson"
                        isLoading={addKontaktMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
