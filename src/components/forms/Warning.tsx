import * as React from 'react';
import { Heading, Icon, Stack, StyleProps } from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Flex } from '@chakra-ui/layout';

type ContainerVariant = 'error' | 'warning';

const VARIANT_COLORS: Record<ContainerVariant, Pick<StyleProps, 'color' | 'backgroundColor'>> = {
    error: {
        backgroundColor: 'errorBackground',
        color: 'onError',
    },
    warning: {
        backgroundColor: 'warning',
        color: 'onWarning',
    },
};

export const WarningContainer: React.FC<{ variant: ContainerVariant }> = ({ variant, children }) => (
    <Stack direction="row" as="section" padding="4" spacing="3" {...VARIANT_COLORS[variant]}>
        <Flex alignItems="flex-start">
            <Icon as={Warning} aria-hidden width="5" height="auto" />
        </Flex>
        <Stack direction="column" spacing="1">
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
