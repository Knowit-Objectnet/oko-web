import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Stack } from '@chakra-ui/react';
import { StasjonNavigation } from './stasjon/StasjonNavigation';
import { Route, useRouteMatch } from 'react-router-dom';
import { StasjonInfo } from './stasjon/StasjonInfo';

const Stasjoner: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Stasjoner</title>
            </Helmet>
            <Stack direction="row" flex="1" alignItems="stretch" padding="5" spacing="10" marginX="auto">
                <StasjonNavigation />
                <Route path={`${url}/:stasjonId`}>
                    {/* TODO: handle no station selected */}
                    <StasjonInfo />
                </Route>
            </Stack>
        </>
    );
};

export default Stasjoner;
