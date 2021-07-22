import * as React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { KategoriBadge } from './KategoriBadge';

export const KunTotalvekt: React.FC = () => (
    <>
        <VStack alignItems="flex-start">
            <Text fontSize="0.7rem" fontWeight="normal" fontStyle="italic">
                Ikke registrert vekt på kategorier
            </Text>
            <HStack>
                <KategoriBadge name="Bygg" />
                <KategoriBadge name="Barn" />
                <KategoriBadge name="Møbler" />
            </HStack>
        </VStack>
    </>
);
