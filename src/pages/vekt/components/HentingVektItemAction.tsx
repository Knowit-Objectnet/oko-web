import * as React from 'react';
import { UpdateVektregistreringButton } from './UpdateVektregistreringButton';
import { HentingDetailsLink } from '../../../components/henting/HentingDetailsLink';
import { Box } from '@chakra-ui/layout';
import { HentingerVektListChildProps } from './HentingVektList';
import { EditVektButton } from './EditVektButton';
import { VStack } from '@chakra-ui/react';

export const HentingVektItemAction: React.FC<HentingerVektListChildProps> = ({ henting, missingVekt, ...props }) => (
    <Box {...props} textAlign="end" orientation="vertical">
        {missingVekt ? (
            <UpdateVektregistreringButton henting={henting} variant="outlineOnSurface" width="full" />
        ) : (
            <VStack spacing="3">
                <HentingDetailsLink henting={henting} variant="outlineOnSurface" width="full" />
                <EditVektButton henting={henting} variant="outlineOnSurface" width="full" />
            </VStack>
        )}
    </Box>
);
