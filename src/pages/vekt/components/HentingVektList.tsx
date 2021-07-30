import * as React from 'react';
import { ChakraProps, List, ListItem, Stack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { HentingTimeLocation } from '../../../components/henting/HentingTimeLocation';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { HentingVektItemTitle } from './HentingVektItemTitle';
import { HentingVektItemKategori } from './HentingVektItemKategori';
import { HentingVektItemAction } from './HentingVektItemAction';

export interface HentingerVektListChildProps extends Pick<ChakraProps, 'width'> {
    henting: ApiHentingWrapper;
    missingVekt?: boolean;
}

interface Props {
    hentinger: Array<ApiHentingWrapper>;
    missingVekt?: boolean;
}

export const HentingVektList: React.FC<Props> = ({ missingVekt, hentinger }) => (
    <Stack as={List} direction="column" spacing="4" width="full">
        {hentinger.map((henting) => (
            <Stack
                as={ListItem}
                key={henting.id}
                direction={{ base: 'column', tablet: 'row' }}
                width="full"
                backgroundColor={missingVekt ? 'error' : 'surface'}
                alignItems="center"
                paddingY="4"
                paddingX="5"
                spacing="5"
                maxWidth="full"
            >
                <HentingVektItemTitle
                    width={{ base: 'full', tablet: '25%' }}
                    henting={henting}
                    missingVekt={missingVekt}
                />
                <HentingVektItemKategori
                    width={{ base: 'full', tablet: '30%' }}
                    henting={henting}
                    missingVekt={missingVekt}
                />
                <Box width={{ base: 'full', tablet: '25%' }}>
                    <HentingTimeLocation henting={henting} />
                </Box>
                <HentingVektItemAction
                    width={{ base: 'full', tablet: '20%' }}
                    henting={henting}
                    missingVekt={missingVekt}
                />
            </Stack>
        ))}
    </Stack>
);
