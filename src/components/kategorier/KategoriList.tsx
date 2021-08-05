import * as React from 'react';
import { ApiKategori } from '../../services/kategori/KategoriService';
import { List, ListItem, Tag } from '@chakra-ui/react';
import { kategorierSorted } from './kategorierSorted';

interface Props {
    kategorier: Array<ApiKategori>;
}

export const KategoriList: React.FC<Props> = ({ kategorier }) => {
    const sortedKategorier = kategorierSorted(kategorier);
    return (
        <List display="flex" flexFlow="row wrap" margin="0" paddingTop="1">
            {sortedKategorier.map((kategori) => (
                <Tag as={ListItem} variant="kategori" key={kategori.id} marginBottom="1" marginRight="1">
                    {kategori.navn}
                </Tag>
            ))}
        </List>
    );
};
