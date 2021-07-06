import * as React from 'react';
import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';
import { useAktorById } from '../../../services/aktor/useAktorById';

interface Props {
    id: string;
    aarsak: string | null;
}

export const AvlystDetails: React.FC<Props & BoxProps> = ({ id, aarsak, ...props }) => {
    const { data: aktor } = useAktorById(id);
    console.log(aktor);

    return (
        <Box p={5} backgroundColor="error" borderRadius="0.5rem" {...props}>
            <Heading fontSize="xl">{aktor?.navn || null}</Heading>
            <Text fontSize="sm" mt={4}>
                {aarsak || null}
            </Text>
        </Box>
    );
};
