import * as React from 'react';
import { ChakraProps, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { HentingTimeLocation } from '../../../components/henting/HentingTimeLocation';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { HentingVektItemTitle } from './HentingVektItemTitle';
import { HentingVektItemKategori } from './HentingVektItemKategori';
import { HentingVektItemAction } from './HentingVektItemAction';
import { HentingListLoading } from '../../../components/henting/HentingListLoading';

export interface HentingerVektListChildProps extends Pick<ChakraProps, 'width'> {
    henting: ApiHentingWrapper;
    missingVekt?: boolean;
}

interface Props {
    hentinger: Array<ApiHentingWrapper>;
    missingVekt?: boolean;
    isLoading?: boolean;
    isError?: boolean;
}

export const HentingVektList: React.FC<Props> = ({ missingVekt, hentinger, isLoading, isError }) => {
    if (isLoading) {
        return <HentingListLoading />;
    }
    if (isError) {
        return <Text>Beklager, klarte ikke å laste vektregistreringer.</Text>;
    }
    if (hentinger.length <= 0) {
        return (
            <Text>
                {missingVekt
                    ? 'Hurra, alle hentinger har registrert vekt!'
                    : 'Fant ingen hentinger med registrert vekt.'}
            </Text>
        );
    }
    return (
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
};
