import * as React from 'react';
import { Skeleton, Text, VStack } from '@chakra-ui/react';
import { createArrayFromLength } from '../../../utils/createArrayFromLength';

export const HentingerVektListLoading: React.FC = () => (
    <VStack width="full" spacing="4" aria-label="Laster inn...">
        {createArrayFromLength(3).map((value) => (
            <Skeleton key={value} width="full" height="100px" />
        ))}
    </VStack>
);

interface Props {
    isLoading: boolean;
    isError: boolean;
}

export const HentingVektListWrapper: React.FC<Props> = ({ isLoading, isError, children }) => {
    if (isLoading) {
        return <HentingerVektListLoading />;
    }
    if (isError) {
        return <Text>Beklager, klarte ikke å laste vektregistreringer.</Text>;
    }
    return <>{children}</>;
};
