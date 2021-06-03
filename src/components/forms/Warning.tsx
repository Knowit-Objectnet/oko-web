import * as React from 'react';
import { Heading, Icon, Stack } from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Flex } from '@chakra-ui/layout';

export const WarningContainer: React.FC = ({ children }) => (
    <Stack direction="row" as="section" padding="4" backgroundColor="errorBackground" color="onError" spacing="3">
        <Flex alignItems="flex-start">
            <Icon as={Warning} aria-hidden width="5" height="auto" />
        </Flex>
        <Stack direction="column" alignItems="center" spacing="1">
            {children}
        </Stack>
    </Stack>
);

export const WarningTitle: React.FC<{ title: string }> = ({ title }) => (
    <Heading as="h3" fontSize="md" fontWeight="medium">
        {title}
    </Heading>
);

export const WarningBody: React.FC = ({ children }) => (
    <Flex direction="column" width="full" fontSize="sm">
        {children}
    </Flex>
);
