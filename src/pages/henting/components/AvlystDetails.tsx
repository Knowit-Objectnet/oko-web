import * as React from 'react';
import { Box, BoxProps, Heading, Text, VStack } from '@chakra-ui/react';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';

interface Props {
    henting: ApiPlanlagtHenting;
}

export const AvlystDetails: React.FC<Props & BoxProps> = ({ henting, ...props }) => (
    <Box p={5} backgroundColor="error" borderRadius="0.5rem" {...props}>
        <Heading fontSize="xl">Fretex</Heading>
        <Text fontSize="sm" mt={4}>
            {henting.aarsak}
        </Text>
    </Box>
);
