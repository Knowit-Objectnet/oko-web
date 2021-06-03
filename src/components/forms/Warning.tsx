import * as React from 'react';
import { Heading, HStack, Icon } from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Box, Flex } from '@chakra-ui/layout';

export const WarningContainer: React.FC = ({ children }) => (
    <HStack
        as="section"
        padding="4"
        backgroundColor="errorBackground"
        color="onError"
        alignItems="flex-start"
        spacing="3"
    >
        <Icon as={Warning} aria-hidden width="5" height="auto" />
        <Box>{children}</Box>
    </HStack>
);

export const WarningTitle: React.FC<{ title: string }> = ({ title }) => (
    <Heading as="h3" fontSize="sm" fontWeight="bold" marginBottom="1">
        {title}
    </Heading>
);

export const WarningBody: React.FC = ({ children }) => (
    <Flex direction="column" width="full" fontSize="sm">
        {children}
    </Flex>
);
