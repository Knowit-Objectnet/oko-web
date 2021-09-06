import * as React from 'react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

// NB! Setting the error messages used by yup
import '../../utils/forms/formErrorMessages';
import { SendVerifiseringButton } from './SendVerifiseringButton';
import { VerifiseringForm } from './VerifiseringForm';

interface Props {
    kontakt?: ApiKontakt;
    /** Callback that will fire if registration is successful: **/
    onSuccess?: () => void;
}

export const VerifiseringPage: React.FC<Props> = ({ kontakt, onSuccess }) => {
    return (
        <Flex flexDirection="column">
            <Box marginBottom="20">
                <Text>Vi sender en verifiseringskode til ditt telefonnummer og e-post.</Text>
                <SendVerifiseringButton kontakt={kontakt!} marginTop="7" />
            </Box>

            {kontakt!.telefon ? <VerifiseringForm kontakt={kontakt!} type="telefon" /> : null}
            {kontakt!.epost ? <VerifiseringForm kontakt={kontakt!} type="e-post" /> : null}

            <Button
                variant="primary"
                width="fit-content"
                onClick={onSuccess}
                alignSelf="flex-end"
                size="lg"
                marginTop="20"
            >
                Ferdig
            </Button>
        </Flex>
    );
};
