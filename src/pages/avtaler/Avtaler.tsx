import * as React from 'react';
import { Stack } from '@chakra-ui/react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PartnerInfo } from './components/PartnerInfo';
import { PartnerNavigation } from './components/PartnerNavigation';

export const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <Stack
                direction="row"
                flex={1}
                alignItems="stretch"
                padding={5}
                spacing={10}
                minHeight="100%"
                marginX="auto"
            >
                <PartnerNavigation />
                <Route path={`${url}/:partnerId`}>
                    {/* TODO: handle no partner selected */}
                    <PartnerInfo />
                </Route>
            </Stack>
        </>
    );
};
