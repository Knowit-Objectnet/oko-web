import * as React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { ButtonGroup, Heading } from '@chakra-ui/react';

export const PartnerInfoSection: React.FC = ({ children }) => (
    <Box as="section" marginY="5" width="full">
        {children}
    </Box>
);

export const PartnerInfoSectionHeader: React.FC = ({ children }) => (
    <Flex
        justifyContent="space-between"
        width="full"
        marginBottom={{ base: '0', handheld: '4' }}
        paddingBottom="4"
        direction={{ base: 'column', handheld: 'row' }}
    >
        {children}
    </Flex>
);

export const PartnerInfoSectionTitle: React.FC = ({ children }) => (
    <Heading as="h2" fontSize="2xl" fontWeight="medium" marginBottom={{ base: '4', handheld: '0' }}>
        {children}
    </Heading>
);

export const PartnerInfoSectionButtons: React.FC = ({ children }) => (
    <ButtonGroup spacing="3" size="sm" alignSelf="center">
        {children}
    </ButtonGroup>
);

export const PartnerInfoSectionContent: React.FC = ({ children }) => <Box>{children}</Box>;
