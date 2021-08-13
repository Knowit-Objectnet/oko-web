import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import { createArrayFromLength } from '../../utils/createArrayFromLength';

export const HentingListLoading: React.FC = () => (
    <VStack width="full" spacing="4" aria-label="Laster inn...">
        {createArrayFromLength(3).map((value) => (
            <Skeleton key={value} width="full" height="100px" />
        ))}
    </VStack>
);
