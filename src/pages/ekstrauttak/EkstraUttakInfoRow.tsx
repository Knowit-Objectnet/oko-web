import { Text, Icon, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    text: string;
    icon: React.ReactNode;
}

export const EkstraUttakInfoRow: React.FC<Props> = ({ text, icon }) => {
    return (
        <Flex>
            <Icon marginRight="3">{icon}</Icon>
            <Text>{text}</Text>
        </Flex>
    );
};
