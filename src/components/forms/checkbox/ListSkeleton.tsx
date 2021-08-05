import * as React from 'react';
import { HStack, Skeleton, SkeletonProps, VStack } from '@chakra-ui/react';
import { createArrayFromLength } from '../../../utils/createArrayFromLength';

interface Props extends Pick<SkeletonProps, 'startColor' | 'endColor'> {
    loadingText?: string;
}

export const ListSkeleton: React.FC<Props> = ({ loadingText, ...props }) => (
    <VStack tabIndex={0} width="full" spacing="2" aria-label={loadingText ?? 'Laster inn valg...'}>
        {createArrayFromLength(3).map((value) => (
            <HStack spacing="2" height="7" key={value} width="full">
                <Skeleton width="7" height="full" {...props} />
                <Skeleton width="full" height="full" {...props} />
            </HStack>
        ))}
    </VStack>
);
