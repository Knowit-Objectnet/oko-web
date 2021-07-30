import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { colors } from '../../../theme/foundations/colors';
import { PartnerPameldingInfo } from '../../ekstrahenting/PartnerPameldingInfo';
import { useAuth } from '../../../auth/useAuth';
import { HentingTimeLocation } from '../../../components/henting/HentingTimeLocation';
import { DetailCategories } from './DetailCategories';
import { DetailDescription } from './DetailDescription';
import { DetailExtraRegistrationInfo } from './DetailExtraRegistrationInfo';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailInfo: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();
    return (
        <>
            <HStack alignItems="center" spacing="10" justifyContent="space-between">
                <VStack spacing="3" alignItems="flex-start" marginTop="4">
                    <HentingTimeLocation henting={henting} />

                    <DetailDescription henting={henting} />

                    <DetailCategories henting={henting.planlagtHenting || henting.ekstraHenting} />
                </VStack>
                {henting.ekstraHenting ? <DetailExtraRegistrationInfo henting={henting.ekstraHenting} /> : null}
            </HStack>
        </>
    );
};
