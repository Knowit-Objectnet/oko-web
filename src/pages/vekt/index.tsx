import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { colors } from '../../theme/foundations/colors';

const Vekt: React.FC = () => (
    <>
        <Helmet>
            <title>Vekt</title>
        </Helmet>
        <Flex
            as="main"
            direction="column"
            paddingY="5"
            paddingX="10"
            marginX="auto"
            width={{ base: '100%', desktop: '80%' }}
        >
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <VStack justify="left" width="100%" align="start">
                    <Heading as="h2" fontWeight="bold" fontSize="xl" marginBottom={4}>
                        Hentinger som mangler vekt
                    </Heading>
                    <Box backgroundColor={colors.Red} w="100%" h={20}>
                        <HStack>
                            <Text fontWeight="bold" fontSize="xl">
                                Ikke registrert vekt
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </Flex>
        </Flex>
    </>
);

export default Vekt;
