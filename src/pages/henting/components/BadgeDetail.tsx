import { Box, BoxProps, Flex } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
    text: string;
}

export const BadgeDetail: React.FC<Props & BoxProps> = ({ text, ...props }) => {
    return (
        <Box
            borderRadius="100"
            fontSize="0.8rem"
            backgroundColor="error"
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
