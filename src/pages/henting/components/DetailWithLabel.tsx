import * as React from 'react';
import { Heading, VStack } from '@chakra-ui/react';

interface Props {
    label: string;
}

export const DetailWithLabel: React.FC<Props> = ({ label, children }) => (
    <VStack spacing="1" alignItems="flex-start">
        <Heading as="h2" fontSize="1rem" fontWeight="medium" paddingTop="2">
            {label}
        </Heading>
        {children}
    </VStack>
);
