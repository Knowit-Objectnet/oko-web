import * as React from 'react';
import { ApiKategori } from '../services/kategori/KategoriService';
import { Tag, UnorderedList } from '@chakra-ui/react';

interface Props {
    kategorier: Array<ApiKategori>;
}

export const KategoriList: React.FC<Props> = ({ kategorier }) => (
    <UnorderedList display="flex" flexFlow="row wrap" margin="0" paddingTop="1">
        {kategorier.map((kategori) => (
            <Tag as="li" key={kategori.id} size="sm" marginBottom="1" marginRight="1">
                {kategori.navn}
            </Tag>
        ))}
    </UnorderedList>
);
