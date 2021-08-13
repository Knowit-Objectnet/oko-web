import { Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const Innstillinger: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Innstillinger</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                width="full"
                alignItems="flex-start"
            >
                <Flex
                    justifyContent="space-between"
                    width="full"
                    marginTop="4"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                >
                    <Heading width="full" as="h1" fontWeight="normal" fontSize="4xl" marginBottom="4">
                        Innstillinger
                    </Heading>
                </Flex>
                <Link as={NavLink} to="/aarsaker" fontSize="2xl" marginTop="6" textDecorationLine="underline">
                    Avlysningsårsaker
                </Link>
                <Link as={NavLink} to="/kategorier" fontSize="2xl" marginTop="6" textDecorationLine="underline">
                    Kategorier
                </Link>
                <Link as={NavLink} to="/stasjoner" fontSize="2xl" marginTop="6" textDecorationLine="underline">
                    Stasjoner
                </Link>
            </Flex>
        </>
    );
};

export default Innstillinger;
