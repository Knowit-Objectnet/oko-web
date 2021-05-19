import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PartnerInfo } from './PartnerInfo';
import { PartnerNavigation } from './components/PartnerNavigation';

export const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <HStack alignItems="stretch" padding={5} spacing={10} height="100%" marginX="auto" maxWidth="1800px">
                <PartnerNavigation />
                <Route path={`${url}/:partnerId`}>
                    <PartnerInfo />
                </Route>
            </HStack>
        </>
    );
};
