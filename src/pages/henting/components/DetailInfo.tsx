import { HStack, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { HentingTimeLocation } from '../../../components/henting/HentingTimeLocation';
import { DetailCategories } from './DetailCategories';
import { DetailDescription } from './DetailDescription';
import { useAuth } from '../../../auth/useAuth';
import { DetailEkstraHentingPameldingInfo } from './DetailEkstraHentingPameldingInfo';
import { Flex } from '@chakra-ui/layout';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();
    return (
        <Flex
            direction={{
                base: 'column',
                desktop: 'row',
            }}
            marginTop="8"
        >
            <VStack spacing="3" alignItems="flex-start">
                <HentingTimeLocation henting={henting} />

                <DetailDescription henting={henting} />

                <DetailCategories henting={henting.planlagtHenting || henting.ekstraHenting} />
            </VStack>
            {henting.ekstraHenting && user.isPartner ? (
                <Flex>
                    {' '}
                    <DetailEkstraHentingPameldingInfo ekstraHenting={henting.ekstraHenting} />{' '}
                </Flex>
            ) : null}
        </Flex>
    );
};
