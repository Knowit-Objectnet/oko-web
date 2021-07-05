import * as React from 'react';
import { useDeleteKategori } from '../../../services/kategori/useDeleteKategori';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { ApiKategori } from '../../../services/kategori/KategoriService';

interface Props {
    kategori: ApiKategori;
}

export const DeleteKategoriButton: React.FC<Props> = ({ kategori }) => {
    const deleteKategoriMutation = useDeleteKategori();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteKategori = () =>
        deleteKategoriMutation.mutateAsync(kategori.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Kategorien ${kategori.navn} ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av ${kategori.navn}` });
            },
        });

    return (
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å slette kategorien. Er du sikker?',
                body: 'Dette vil ikke gjøre det mulig å vektrapportere videre på kategorien.',
                buttonLabel: 'Ja, slett kategorien',
            }}
            onConfirm={handleDeleteKategori}
            isLoading={deleteKategoriMutation.isLoading}
        >
            <DeleteButton label="Slett" aria-label="Slett kategorien" />
        </ConfirmationPopover>
    );
};
