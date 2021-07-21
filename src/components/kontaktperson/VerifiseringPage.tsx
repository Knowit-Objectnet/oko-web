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
import { VerifiseringForm } from './VerifiseringForm';

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
    /** Callback that will fire if registration is successful: **/
    onSuccess: () => void;
}

export const VerifiseringPage: React.FC<Props> = ({ kontakt, onSuccess }) => {
    const verifiserMutation = useVerifiser();
    const showSuccessToast = useSuccessToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();

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

    const telefonVerifisert = kontakt.verifiseringStatus.telefonVerifisert;
    const epostVerifisert = kontakt.verifiseringStatus.epostVerifisert;

    const showTelefonForm = () => {
        return (
            <>
                <Heading as="h2" fontSize="2xl">
                    Verifiser SMS
                </Heading>
                <Input
                    name="telefonKode"
                    label="Skriv inn kode fra SMS"
                    type="number"
                    isDisabled={telefonVerifisert}
                    helperText="Vi sender en verifiseringskode til ditt telefonnummer."
                />
                {telefonVerifisert ? <VerifisertBox aria-label="Telefonnummer er verifisert" /> : null}
            </>
        );
    };

    const showEpostForm = () => {
        return (
            <>
                <Heading as="h2" fontSize="2xl">
                    Verifiser E-post
                </Heading>
                <Input
                    name="epostKode"
                    label="Skriv inn kode fra e-post"
                    type="number"
                    isDisabled={epostVerifisert}
                    helperText="Vi sender en verifiseringskode til din e-post."
                />
                {epostVerifisert ? <VerifisertBox aria-label="E-post er verifisert" /> : null}
            </>
        );
    };

    return (
        <Flex flexDirection="column">
            <VerifiseringForm kontakt={kontakt} type="telefon" />
            <VerifiseringForm kontakt={kontakt} type="e-post" />
            <SendVerifiseringButton kontakt={kontakt} marginTop="7" />
            <Button
                variant="primary"
                width="fit-content"
                onClick={onSuccess}
                alignSelf="flex-end"
                size="lg"
                marginTop="7"
            >
                Ferdig
            </Button>
        </Flex>
    );
};
