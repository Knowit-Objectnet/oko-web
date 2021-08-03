import React from 'react';
import { Text, Spinner, VStack, Fade, Flex } from '@chakra-ui/react';

interface Props {
    label?: string;
}

export const Loading: React.FC<Props> = ({ label }) => (
    <Flex
        as="main"
        width="full"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding="4"
    >
        <Fade in>
            <VStack spacing="6">
                <Spinner speed="0.9s" thickness="0.4rem" size="2xl" color="primary" aria-hidden />
                <Text fontSize={{ base: '2xl', tablet: '4xl' }} maxWidth="lg" fontWeight="normal">
                    {label || 'Laster inn...'}
                </Text>
            </VStack>
        </Fade>
    </Flex>
);
