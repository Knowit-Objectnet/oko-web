import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Stack } from '@chakra-ui/react';
import { StasjonNavigation } from './stasjon/StasjonNavigation';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { StasjonInfo } from './stasjon/StasjonInfo';
import { FormRoute } from '../../components/forms/FormRoute';
import { StasjonForm } from './forms/StasjonForm';

const Stasjoner: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Stasjoner</title>
            </Helmet>
            <Switch>
                <FormRoute path={`${url}/ny`} title="Legg til ny stasjon">
                    <StasjonForm />
                </FormRoute>
                <FormRoute path={`${url}/rediger`} title="Rediger stasjon">
                    <StasjonForm />
                </FormRoute>
                <Route exact path={[url, `${url}/:stasjonId`]}>
                    <Stack direction="row" flex="1" alignItems="stretch" padding="5" spacing="10" marginX="auto">
                        <StasjonNavigation />
                        <Route exact path={`${url}/:stasjonId`}>
                            {/* TODO: handle no station selected */}
                            <StasjonInfo />
                        </Route>
                    </Stack>
                </Route>
            </Switch>
        </>
    );
};

export default Stasjoner;
