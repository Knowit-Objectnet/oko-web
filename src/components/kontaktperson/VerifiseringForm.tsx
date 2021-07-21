import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiKontakt, ApiVerifiserPost } from '../../services/aktor/KontaktService';
import { Button, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { ErrorMessages } from '../forms/ErrorMessages';
import { Input } from '../forms/input/Input';
import { FormSubmitButton } from '../forms/FormSubmitButton';
import { upperFirst } from 'lodash';
import { useSuccessToast } from '../toasts/useSuccessToast';
import { ApiError } from '../../services/httpClient';
import Check from '../../assets/Check.svg';

// NB! Setting the error messages used by yup
import '../../utils/forms/formErrorMessages';
import { useVerifiser } from '../../services/aktor/useVerifiser';
import { SendVerifiseringButton } from './SendVerifiseringButton';

const validationSchema = (label: string) =>
    yup.object().shape({
        kode: yup
            .string()
            .label(label)
            .trim()
            .matches(/^\d{6}$/, {
                message: ({ label }: { label: string }) => `${upperFirst(label)} må være en gyldig sekssifret kode`,
                excludeEmptyString: true,
            })
            .transform((code: string) => (code.length === 0 ? null : code))
            .nullable(),
    });

interface Props {
    kontakt: ApiKontakt;
    type: 'telefon' | 'e-post';
}

interface SingleVerifiseringType {
    id: string;
    kode: string;
}

export const VerifiseringForm: React.FC<Props> = ({ kontakt, type }) => {
    const formMethods = useForm<SingleVerifiseringType>({
        resolver: yupResolver(validationSchema(`Verifiseringskode for ${type}`)),
        defaultValues: undefined,
    });

    const verifiserMutation = useVerifiser();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

    const handleSubmit = formMethods.handleSubmit((formData) => {
        setApiOrNetworkError(undefined);

        verifiserMutation.mutate(
            {
                id: kontakt.id,
                telefonKode: type === 'telefon' ? formData.kode : undefined,
                epostKode: type === 'e-post' ? formData.kode : undefined,
            },
            {
                onSuccess: (data) => {
                    onApiSubmitSuccess(`${
                        data.telefonVerifisert ? 'Telefon er verifisert\n' : 'Telefon er ikke verifisert\n'
                    }
                    ${data.epostVerifisert ? 'Epost er verifisert' : 'Epost er ikke verifisert'}`);
                },
                onError: onApiSubmitError,
            },
        );
    });

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: 'Koder sendt', description: successMessage });
    };

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        setApiOrNetworkError('Uffda, noe gikk galt ved registreringen. Vennligst prøv igjen.');
    };

    const VerifisertBox = () => {
        return (
            <Flex
                flexDirection="row"
                alignItems="center"
                padding="1"
                backgroundColor="LightGreen"
                width="fit-content"
                alignSelf="flex-end"
            >
                <Icon as={Check} marginRight="1" />
                <Text>Verifisert</Text>
            </Flex>
        );
    };

    const isVerifisert =
        type === 'telefon' ? kontakt.verifiseringStatus.telefonVerifisert : kontakt.verifiseringStatus.epostVerifisert;

    const getForm = () => {
        return (
            <>
                <Heading as="h2" fontSize="2xl">
                    {`Verifiser ${type === 'telefon' ? 'SMS' : 'e-post'}`}
                </Heading>
                <Input
                    name="kode"
                    label={`Skriv inn kode fra ${type === 'telefon' ? 'SMS' : 'e-post'}`}
                    type="number"
                    isDisabled={isVerifisert}
                    helperText={`Vi sender en verifiseringskode til ${
                        type === 'telefon' ? 'ditt telefonnummer' : 'din e-post'
                    }.`}
                />
            </>
        );
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing="7" width="full">
                    <ErrorMessages globalError={apiOrNetworkError} />
                    {getForm()}
                    <Flex width="full" justifyContent="flex-end" marginBottom="2">
                        {isVerifisert ? (
                            <VerifisertBox
                                aria-label={` ${type === 'telefon' ? 'Telefonnummer' : 'E-post'} er verifisert`}
                            />
                        ) : (
                            <FormSubmitButton
                                label={`Verifiser ${type === 'telefon' ? 'SMS' : 'e-post'}`}
                                size="lg"
                                width="fit-content"
                                paddingX="3"
                                paddingY="2"
                                margin="0"
                                isLoading={verifiserMutation.isLoading}
                                loadingText="Lagrer..."
                            />
                        )}
                    </Flex>
                </Stack>
            </form>
        </FormProvider>
    );
};
