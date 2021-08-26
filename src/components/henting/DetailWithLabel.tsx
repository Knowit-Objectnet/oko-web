import * as React from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';

interface Props {
    label: string;
}

export const DetailWithLabel: React.FC<Props> = ({ label, children }) => (
    <VStack spacing="1.5" alignItems="flex-start" width="17rem">
        <Heading as="h2" fontSize="md" fontWeight="medium" paddingTop="2">
            {label}
        </Heading>
        {children}
    </VStack>
);
