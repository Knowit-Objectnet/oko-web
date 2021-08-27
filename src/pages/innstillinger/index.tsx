import { Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const Innstillinger: React.FC = () => {
    const routeLink = (to: string, text: string) => (
        <Link
            as={NavLink}
            to={to}
            fontSize={{ base: 'xl', handheld: '2xl' }}
            marginTop="6"
            textDecorationLine="underline"
        >
            {text}
        </Link>
    );

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
                <Heading
                    width="full"
                    as="h1"
                    fontWeight="normal"
                    fontSize={{ base: '2xl', handheld: '4xl' }}
                    marginTop="10"
                    paddingBottom="4"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                >
                    Innstillinger
                </Heading>
                {routeLink('/aarsaker', 'Avlysningsårsaker')}
                {routeLink('/kategorier', 'Kategorier')}
                {routeLink('/stasjoner', 'Stasjoner')}

                <Heading
                    width="full"
                    as="h1"
                    fontWeight="normal"
                    fontSize={{ base: '2xl', handheld: '4xl' }}
                    marginTop="10"
                    paddingBottom="4"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                >
                    Personvern
                </Heading>
                {routeLink('/personvern', 'Om personvern i tjenesten')}
            </Flex>
        </>
    );
};

export default Innstillinger;
