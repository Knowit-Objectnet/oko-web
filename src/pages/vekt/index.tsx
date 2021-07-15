import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { MissingRegistration } from './components/MissingRegistration';
import { NoMissingRegistration } from './components/NoMissingRegistration';

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
            marginY="5"
            width={{ base: '100%', desktop: '80%' }}
        >
            <Flex direction="column" height="100%">
                <Flex direction="column" marginBottom={20}>
                    <Heading as="h2" fontSize="1.5rem" fontWeight="bold">
                        Hentinger som mangler vekt
                    </Heading>
                    <Flex direction="column">
                        <MissingRegistration />
                    </Flex>
                </Flex>
                <Flex direction="column">
                    <Heading as="h2" fontSize="1.5rem" fontWeight={400}>
                        Tidligere veiinger
                    </Heading>
                    <Flex direction="column">
                        <NoMissingRegistration />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </>
);

export default Vekt;
