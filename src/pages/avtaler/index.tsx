import * as React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PartnerInfo } from './partner/PartnerInfo';
import { PartnerNavigation } from './partner/PartnerNavigation';
import { Stack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <Stack direction="row" flex="1" alignItems="stretch" padding="5" spacing="10" marginX="auto">
                <Route exact path={url}>
                    <PartnerNavigation />
                </Route>
                <Route path={`${url}/:partnerId`}>
                    {/* TODO: handle no partner selected */}
                    <Box width={{ base: 'full', desktop: '80%' }} marginX="auto">
                        <PartnerInfo />
                    </Box>
                </Route>
            </Stack>
        </>
    );
};

export default Avtaler;
