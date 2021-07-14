import { Box, BoxProps, Flex } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
    text: string;
    color: string;
}

export const BadgeDetail: React.FC<Props & BoxProps> = ({ text, color, ...props }) => {
    return (
        <Box
            borderRadius={100}
            fontSize="0.8rem"
            backgroundColor={color}
            display="inline"
            padding={2}
            paddingLeft={4}
            paddingRight={4}
            {...props}
        >
            {text}
        </Box>
    );
};
