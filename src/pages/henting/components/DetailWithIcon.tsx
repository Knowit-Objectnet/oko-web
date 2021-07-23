import React from 'react';
import { HStack, Icon } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

interface Props {
    icon: React.ElementType;
    label: string;
}

export const DetailWithIcon: React.FC<Props> = ({ icon, label, children }) => (
    <HStack>
        <Icon as={icon} aria-label={label} transform="translateY(-2px)" boxSize="1.5rem" />
        <Box>{children}</Box>
    </HStack>
);
