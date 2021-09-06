import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import { KategoriTable } from './KategoriTable';
import { AddKategoriButton } from './forms/AddKategoriButton';
import { Route, useRouteMatch } from 'react-router-dom';
import { FormRoute } from '../../components/forms/FormRoute';
import { KategoriForm } from './forms/KategoriForm';

const Kategorier: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Kategorier</title>
            </Helmet>
            <Route exact path={url}>
                <Flex as="main" direction="column" paddingY="5" paddingX="10" marginX="auto" width="full">
                    <Flex
                        justifyContent="space-between"
                        width="full"
                        marginY="4"
                        alignItems="center"
                        borderBottom="1px solid"
                        borderBottomColor="gray.200"
                    >
                        <Heading width="full" as="h1" fontWeight="normal" fontSize="4xl" marginBottom="4">
                            Kategorier
                        </Heading>
                        <AddKategoriButton />
                    </Flex>
                    <Box width="full" overflowX="auto">
                        <KategoriTable />
                    </Box>
                </Flex>
            </Route>
            <FormRoute path={`${url}/ny`} title="Legg til ny kategori">
                <KategoriForm />
            </FormRoute>
            <FormRoute path={`${url}/rediger`} title="Rediger kategori">
                <KategoriForm />
            </FormRoute>
        </>
    );
};

export default Kategorier;
