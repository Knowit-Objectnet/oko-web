import * as React from 'react';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { useUpdateHenting } from '../../../services/henting/useUpdateHenting';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react';
import { AvlystHentingForm } from '../form/AvlystHentingForm';
import { Modal } from '../../../components/Modal';

interface Props {
    henting: ApiPlanlagtHenting;
}

export const CancelPlanlagtHentingButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ henting, ...props }) => {
    const updateHentingMutation = useUpdateHenting();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleCancelHenting = () =>
        updateHentingMutation.mutateAsync(
            {
                id: henting.id,
                avlyst: true,
                aarsakId: henting.aarsakId || undefined,
            },
            {
                onSuccess: () => {
                    showSuccessToast({ title: `Hentingen ble avlyst` });
                },
                onError: (error) => {
                    // TODO: show error message in popover?
                    showErrorToast({ title: `Noe gikk galt, klarte ikke å avlyse hentingen` });
                },
            },
        );

    return (
        <>
            <Button {...props} onClick={onOpen}>
                Avlys hentingen
            </Button>
            <Modal title="Hvorfor avlyser du?" isOpen={isOpen} onClose={onClose}>
                <AvlystHentingForm hentingToCancel={henting} onSuccess={onClose} onSubmit={handleCancelHenting} />
            </Modal>
        </>
    );
};
