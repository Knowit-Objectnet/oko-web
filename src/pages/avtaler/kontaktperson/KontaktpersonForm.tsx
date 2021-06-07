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

// NB! Setting the error messages used by yup
import '../../../utils/forms/formErrorMessages';

const validationSchema = yup.object().shape({
    navn: yup.string().label('navn på kontaktpersonen').trim().required().min(5),
    // TODO: telefon: yup.string().label(' ').trim().required().regexpattern,
    // TODO: epost: yup.string().label(' ').trim().required().regexpattern,
    // TODO: rolle: yup.string().label(' ').trim().required().min(5),
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

    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((data) => {
        // setApiOrNetworkError(undefined);

        console.log(data);

        // addKontaktMutation.mutate(data, {
        //     onSuccess: () => {
        //         showSuccessToast({ title:  });
        //         onSuccess?.();
        //     },
        //     onError: (error) => {
        //         // TODO: get details from error and set appropriate message.
        //         //  If caused by user: set message to correct field
        //         setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
        //     },
        // });
    });

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7">
                    <RequiredFieldsInstruction />
                    <ErrorMessages globalError={apiOrNetworkError} />
                    <Input name="navn" label="Navn" helperText="Skriv inn fullt navn (for- og etternavn)" required />
                    <Input type="phone" name="telefon" label="Telefonnummer" helperText="TODO: FORMAT" required />
                    <Input type="email" name="epost" label="E-postadresse" required />
                    <Input name="rolle" label="TODO: select? Rolle" required />
                    <FormSubmitButton
                        label="Registrer ny kontaktperson"
                        // TODO : isLoading={addKontaktMutation.isLoading}
                        loadingText="Vennligst vent..."
                    />
                </Stack>
            </form>
        </FormProvider>
    );
};
