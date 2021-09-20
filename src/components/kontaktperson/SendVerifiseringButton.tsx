import { Button, ButtonProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { useSendVerifisering } from '../../services/aktor/useSendVerifisering';
import { useErrorToast } from '../toasts/useErrorToast';
import { useSuccessToast } from '../toasts/useSuccessToast';

interface Props extends ButtonProps {
    kontakt: ApiKontakt;
}

export const SendVerifiseringButton: React.FC<Props> = ({ kontakt, ...props }) => {
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();
    const [apiOrNetworkError, setApiOrNetworkError] = useState<string>();
    const sendVerifiseringMutation = useSendVerifisering();

    const handleClick = () => {
        setApiOrNetworkError(undefined);
        const successTitle =
            numOfVerifiseringToSend() > 1 ? `Verifikasjonskoder er sendt` : `Verifikasjonskode er sendt`;
        sendVerifiseringMutation.mutate(kontakt.id, {
            onSuccess: () => {
                showSuccessToast({ title: successTitle });
            },
            onError: () => {
                showErrorToast({ title: 'Uffda, noe gikk galt med utsendingen. Vennligst prøv igjen.' });
            },
        });
    };

    const numOfVerifiseringToSend = () => {
        let count = 0;
        if (kontakt.telefon && !kontakt.verifiseringStatus.telefonVerifisert) count += 1;
        if (kontakt.epost && !kontakt.verifiseringStatus.epostVerifisert) count += 1;
        return count;
    };

    return (
        <Button
            type="submit"
            width="full"
            variant="primary"
            size="lg"
            isLoading={sendVerifiseringMutation.isLoading}
            loadingText={numOfVerifiseringToSend() > 1 ? 'Sender verifiseringskoder...' : 'Sender verifiseringskode...'}
            onClick={handleClick}
            aria-label="Send verifiseringskoder e-post og/eller SMS"
            {...props}
        >
            {numOfVerifiseringToSend() > 1 ? 'Send verifiseringskoder' : 'Send verifiseringskode'}
        </Button>
    );
};
