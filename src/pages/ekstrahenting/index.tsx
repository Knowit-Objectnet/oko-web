import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import { EkstraHentingSortedInfo } from './EkstraHentingSortedInfo';
import { Route, useRouteMatch } from 'react-router-dom';
import { FormRoute } from '../../components/forms/FormRoute';
import { EkstraHentingForm } from './forms/EkstraHentingForm';
import { UtlysFlerePartnereForm } from './forms/UtlysFlerePartnereForm';

const EkstraHenting: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Ekstrahenting</title>
            </Helmet>
            <Route exact path={url}>
                <Flex
                    as="main"
                    direction="column"
                    paddingY="5"
                    paddingX="10"
                    marginX="auto"
                    width={{ base: '100%', xl: '80%', tablet: '80%', desktop: '100%' }}
                >
                    <EkstraHentingSortedInfo />
                </Flex>
            </Route>
            <FormRoute path={`${url}/ny`} title="Registrer ny ekstrahenting">
                <EkstraHentingForm />
            </FormRoute>
            <FormRoute path={`${url}/leggtil`} title="Legg til flere partnere">
                <UtlysFlerePartnereForm />
            </FormRoute>
        </>
    );
};

export default EkstraHenting;
