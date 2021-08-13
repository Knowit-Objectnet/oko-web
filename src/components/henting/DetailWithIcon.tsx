import React from 'react';
import { HStack, Icon, Text } from '@chakra-ui/react';

interface Props {
    icon: React.ElementType;
    label: string;
}

export const DetailWithIcon: React.FC<Props> = ({ icon, label, children }) => (
    <HStack>
        <Icon as={icon} aria-label={label} transform="translateY(-2px)" boxSize="1.5rem" />
        <Text whiteSpace="nowrap">{children}</Text>
    </HStack>
);
