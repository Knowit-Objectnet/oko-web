import { Box, BoxProps, Flex, Icon, Text } from '@chakra-ui/react';
import * as React from 'react';
import { ReactElement } from 'react';

interface Props {
    text: string;
    color: string;
    iconLeft?: any;
    iconRight?: any;
}

export const BadgeDetail: React.FC<Props & BoxProps> = ({ text, color, iconLeft, iconRight, ...props }) => {
    return (
        <Flex
            borderRadius={100}
            fontSize="0.8rem"
            backgroundColor={color}
            padding={2}
            paddingLeft={4}
            paddingRight={4}
            {...props}
            alignItems="center"
        >
            {iconLeft ? <Icon as={iconLeft} marginRight={1.5} /> : null}
            {text}
            {iconRight ? <Icon as={iconRight} marginLeft={1.5} /> : null}
        </Flex>
    );
};
