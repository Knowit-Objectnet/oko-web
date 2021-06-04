import * as React from 'react';
import { Box } from '@chakra-ui/layout';
import { Heading, Text } from '@chakra-ui/react';

export const FormInfoSection: React.FC = ({ children }) => (
    <Box as="section" backgroundColor="gray.100" width="full" padding="5">
        {children}
    </Box>
);

export const FormInfoHeading: React.FC = ({ children }) => (
    <Heading as="h3" fontSize="md" fontWeight="medium">
        {children}
    </Heading>
);

export const FormInfoBody: React.FC = ({ children }) => <Text>{children}</Text>;
