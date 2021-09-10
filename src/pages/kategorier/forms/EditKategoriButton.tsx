import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiKategori } from '../../../services/kategori/KategoriService';
import { useHistory } from 'react-router-dom';

interface Props {
    kategori: ApiKategori;
}

export const EditKategoriButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kategori, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/kategorier/rediger?kategoriId=${kategori.id}`, { kategori: kategori });

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
