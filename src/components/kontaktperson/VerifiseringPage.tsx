import * as React from 'react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { Button, Flex } from '@chakra-ui/react';

// NB! Setting the error messages used by yup
import '../../utils/forms/formErrorMessages';
import { SendVerifiseringButton } from './SendVerifiseringButton';
import { VerifiseringForm } from './VerifiseringForm';

interface Props {
    kontakt: ApiKontakt;
    /** Callback that will fire if registration is successful: **/
    onClose: () => void;
}

export const VerifiseringPage: React.FC<Props> = ({ kontakt, onClose }) => {
    return (
        <Flex flexDirection="column">
            <VerifiseringForm kontakt={kontakt} type="telefon" />
            <VerifiseringForm kontakt={kontakt} type="e-post" />
            <SendVerifiseringButton kontakt={kontakt} marginTop="7" />
            <Button
                variant="primary"
                width="fit-content"
                onClick={onClose}
                alignSelf="flex-end"
                size="lg"
                marginTop="7"
            >
                Ferdig
            </Button>
        </Flex>
    );
};
