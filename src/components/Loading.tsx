import React from 'react';
import { Text, Spinner, VStack, Fade, Flex } from '@chakra-ui/react';

interface Props {
    label?: string;
    hideLabel?: boolean;
    isFullPage?: boolean;
}

export const Loading: React.FC<Props> = ({ label, hideLabel, isFullPage }) => (
    <Flex
        as={isFullPage ? 'main' : 'div'}
        width="full"
        height={isFullPage ? '100vh' : 'full'}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding="4"
    >
        <Fade in>
            <VStack spacing="6">
                <Spinner speed="0.9s" thickness="0.4rem" size="2xl" color="primary" aria-hidden />
                <Text
                    fontSize={{ base: '2xl', tablet: '4xl' }}
                    maxWidth="lg"
                    fontWeight="normal"
                    opacity={hideLabel ? 0 : 1}
                >
                    {label || 'Laster inn...'}
                </Text>
            </VStack>
        </Fade>
    </Flex>
);
