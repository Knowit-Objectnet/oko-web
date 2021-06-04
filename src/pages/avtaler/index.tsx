import * as React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PartnerInfo } from './partner/PartnerInfo';
import { PartnerNavigation } from './PartnerNavigation';
import { Stack } from '@chakra-ui/react';

const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <Stack direction="row" flex="1" alignItems="stretch" padding="5" spacing="10" marginX="auto">
                <PartnerNavigation />
                <Route path={`${url}/:partnerId`}>
                    {/* TODO: handle no partner selected */}
                    <PartnerInfo />
                </Route>
            </Stack>
        </>
    );
};

export default Avtaler;
