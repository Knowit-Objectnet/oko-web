import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Heading, Text, VStack } from '@chakra-ui/react';

export const GlobalError: React.FC<FallbackProps> = ({ error }) => {
    console.log('Feiltidspunkt: ', new Date());

    return (
        <VStack
            as="main"
            width="full"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            spacing="4"
            textAlign="center"
            padding="4"
        >
            <Heading as="h1" maxWidth="lg" fontWeight="normal">
                Ånei, her gikk noe galt <span aria-hidden>😟</span>
            </Heading>
            <Text>Forsøk å oppdatere nettsiden for å se om det løser problemet.</Text>
        </VStack>
    );
};
