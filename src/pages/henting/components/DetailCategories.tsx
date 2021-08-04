import * as React from 'react';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategoriList } from '../../../components/KategoriList';
import { DetailWithLabel } from '../../../components/henting/DetailWithLabel';

interface Props {
    henting: ApiHenting | undefined;
}

export const DetailCategories: React.FC<Props> = ({ henting }) => {
    if (henting && henting.kategorier.length > 0) {
        return (
            <DetailWithLabel label="Kategorier">
                <KategoriList kategorier={henting.kategorier.map(({ kategori }) => kategori)} />
            </DetailWithLabel>
        );
    }
    return null;
};
