import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ButtonGroup, Heading, HStack, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddAarsakButton } from './AddAarsakButton';
import { AarsakList } from './AarsakList';
import { Route, useRouteMatch } from 'react-router-dom';
import { FormRoute } from '../../components/forms/FormRoute';
import { AarsakForm } from './AarsakForm';

const Aarsaker: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avlysningsårsaker</title>
            </Helmet>
            <Route exact path={url}>
                <Flex as="main" direction="column" paddingY="5" paddingX="10" width="full">
                    <Heading
                        as="h1"
                        fontWeight="normal"
                        fontSize="4xl"
                        width="fit-content"
                        paddingBottom="4"
                        marginTop="5"
                        marginBottom="4"
                        borderBottom="1px solid"
                        borderBottomColor="gray.200"
                        borderBottomWidth="2"
                    >
                        Avlysningsårsaker
                    </Heading>
                    <Flex direction={{ base: 'column', desktop: 'row' }} margin="15" alignItems="flex-start">
                        <VStack alignItems="flex-start" flexGrow={1}>
                            <Heading as="h2" fontWeight="bold" fontSize="md" minWidth="500">
                                Stasjon
                            </Heading>
                            <AarsakList isPartnerAarsaker={false} />
                        </VStack>
                        <VStack alignItems="flex-start" flexGrow={1}>
                            <Heading as="h2" fontWeight="bold" fontSize="md" minWidth="500">
                                Partner
                            </Heading>
                            <AarsakList isPartnerAarsaker={true} />
                        </VStack>
                    </Flex>
                    <ButtonGroup marginRight="30" justifyContent="right">
                        <AddAarsakButton />
                    </ButtonGroup>
                </Flex>
            </Route>
            <FormRoute path={`${url}/ny`} title="Legg til ny årsak">
                <AarsakForm />
            </FormRoute>
        </>
    );
};

export default Aarsaker;
