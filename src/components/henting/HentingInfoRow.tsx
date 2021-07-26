import { Text, Icon, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    text: string;
    icon: React.ReactNode;
}

export const HentingInfoRow: React.FC<Props> = ({ text, icon }) => {
    return (
        <Flex>
            <Icon marginRight="3" aria-hidden fontSize="2xl">
                {icon}
            </Icon>
            <Text>{text}</Text>
        </Flex>
    );
};
