import * as React from 'react';
import { HStack, Skeleton, VStack } from '@chakra-ui/react';

interface Props {
    loadingText?: string;
}

export const CheckBoxGroupSkeleton: React.FC<Props> = ({ loadingText }) => (
    <VStack tabIndex={0} width="full" spacing="2" aria-label={loadingText ?? 'Laster inn valg...'}>
        {[...Array(3).keys()].map((value) => (
            <HStack spacing="2" height="7" key={value} width="full">
                <Skeleton width="7" height="full" />
                <Skeleton width="full" height="full" />
            </HStack>
        ))}
    </VStack>
);
