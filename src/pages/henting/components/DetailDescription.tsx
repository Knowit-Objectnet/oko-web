import * as React from 'react';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { DetailWithLabel } from '../../../components/henting/DetailWithLabel';
import { Text } from '@chakra-ui/react';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailDescription: React.FC<Props> = ({ henting }) => {
    if (henting.planlagtHenting?.merknad) {
        return (
            <DetailWithLabel label="Merknad">
                <Text fontWeight={700}>{henting.planlagtHenting.merknad}</Text>
            </DetailWithLabel>
        );
    }

    if (henting.ekstraHenting?.beskrivelse) {
        return (
            <DetailWithLabel label="Beskrivelse">
                <Text fontWeight={700}>{henting.ekstraHenting.beskrivelse}</Text>
            </DetailWithLabel>
        );
    }

    return null;
};
