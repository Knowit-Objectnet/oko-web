import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { KategoriForm } from './KategoriForm';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiKategori } from '../../../services/kategori/KategoriService';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    kategori: ApiKategori;
}

export const EditKategoriButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kategori, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () =>
        history.push(`/kategorier/rediger?kategoriId=${kategori.id}`, { kategoriToEdit: kategori, callback: url });

    return (
        <>
            <EditButton
                label="Rediger"
                borderRadius="6"
                aria-label={`Rediger informasjon for ${kategori.navn}`}
                {...props}
                onClick={onClick}
            />
        </>
    );
};
