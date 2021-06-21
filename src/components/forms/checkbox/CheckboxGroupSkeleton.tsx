import * as React from 'react';
import { HStack, Skeleton, VStack } from '@chakra-ui/react';
import { createArrayFromLength } from '../../../utils/createArrayFromLength';

interface Props {
    loadingText?: string;
}

export const CheckboxGroupSkeleton: React.FC<Props> = ({ loadingText }) => (
    <VStack tabIndex={0} width="full" spacing="2" aria-label={loadingText ?? 'Laster inn valg...'}>
        {createArrayFromLength(3).map((value) => (
            <HStack spacing="2" height="7" key={value} width="full">
                <Skeleton width="7" height="full" />
                <Skeleton width="full" height="full" />
            </HStack>
        ))}
    </VStack>
);
