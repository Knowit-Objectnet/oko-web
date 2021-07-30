import * as React from 'react';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategoriList } from '../../../components/KategoriList';
import { DetailWithLabel } from '../../../components/henting/DetailWithLabel';

interface Props {
    henting: ApiHenting | undefined;
}

export const DetailCategories: React.FC<Props> = ({ henting }) => (
    <>
        {henting && henting.kategorier.length > 0 ? (
            <DetailWithLabel label="Kategorier">
                <KategoriList kategorier={henting.kategorier.map(({ kategori }) => kategori)} />
            </DetailWithLabel>
        ) : null}
    </>
);
