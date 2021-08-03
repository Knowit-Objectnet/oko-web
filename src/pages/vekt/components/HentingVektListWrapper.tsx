import * as React from 'react';
import { Text } from '@chakra-ui/react';
import { HentingListLoading } from '../../../components/henting/HentingListLoading';

interface Props {
    isLoading: boolean;
    isError: boolean;
}

export const HentingVektListWrapper: React.FC<Props> = ({ isLoading, isError, children }) => {
    if (isLoading) {
        return <HentingListLoading />;
    }
    if (isError) {
        return <Text>Beklager, klarte ikke å laste vektregistreringer.</Text>;
    }
    return <>{children}</>;
};
