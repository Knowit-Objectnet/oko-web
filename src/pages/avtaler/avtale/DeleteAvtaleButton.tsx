import React from 'react';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useDeleteAvtale } from '../../../services/avtale/useDeleteAvtale';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { ButtonProps } from '@chakra-ui/react';

interface Props {
    avtale: ApiAvtale;
}

export const DeleteAvtaleButton: React.FC<Props & ButtonProps> = ({ avtale, ...props }) => {
    const deleteAvtaleMutation = useDeleteAvtale();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteAvtale = () =>
        deleteAvtaleMutation.mutateAsync(avtale.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Avtalen ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av avtalen` });
            },
        });

    return (
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å slette avtalen. Er du sikker?',
                body: 'Dette vil også slette alle tilknyttede henteplaner og hentinger som ikke er gjennomført ennå.',
                buttonLabel: 'Ja, slett avtalen',
            }}
            onConfirm={handleDeleteAvtale}
            isLoading={deleteAvtaleMutation.isLoading}
        >
            <DeleteButton label="Slett avtale" borderRadius="6" {...props} />
        </ConfirmationPopover>
    );
};
