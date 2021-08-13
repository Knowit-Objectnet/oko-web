import * as React from 'react';
import { KategoriList } from '../../../components/kategorier/KategoriList';
import { KategoriVektList } from './KategoriVektList';
import { HentingerVektListChildProps } from './HentingVektList';
import { Box } from '@chakra-ui/layout';
import { getKategorier, getVektregistreringer } from '../../../utils/wrappedHentingHelpers';

export const HentingVektItemKategori: React.FC<HentingerVektListChildProps> = ({ henting, missingVekt, ...props }) => (
    <Box {...props}>
        {missingVekt ? (
            <KategoriList kategorier={getKategorier(henting)} />
        ) : (
            <KategoriVektList vektregistreringer={getVektregistreringer(henting)} />
        )}
    </Box>
);
