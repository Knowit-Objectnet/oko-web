import * as React from 'react';
import { UpdateVektregistreringButton } from './UpdateVektregistreringButton';
import { HentingDetailsLink } from '../../../components/henting/HentingDetailsLink';
import { Box } from '@chakra-ui/layout';
import { HentingerVektListChildProps } from './HentingVektList';

export const HentingVektItemAction: React.FC<HentingerVektListChildProps> = ({ henting, missingVekt, ...props }) => (
    <Box {...props} textAlign="end">
        {missingVekt ? (
            <UpdateVektregistreringButton henting={henting} variant="outlineOnSurface" width="full" />
        ) : (
            <HentingDetailsLink henting={henting} variant="outlineOnSurface" width="full" />
        )}
    </Box>
);
