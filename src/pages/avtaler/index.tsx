import * as React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PartnerInfo } from './partner/PartnerInfo';
import { PartnerNavigation } from './partner/PartnerNavigation';
import { Stack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { AvtaleForm } from './avtale/AvtaleForm';
import { FormRoute } from '../../components/forms/FormRoute';
import { AddHenteplanForm } from './henteplan/form/AddHenteplanForm';
import { EditHenteplanForm } from './henteplan/form/EditHenteplanForm';

const Avtaler: React.FC = () => {
    const { url } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>Avtaler</title>
            </Helmet>
            <Stack direction="row" flex="1" alignItems="stretch" spacing="10" marginX="auto">
                <Route exact path={url}>
                    <PartnerNavigation />
                </Route>
                <Route exact path={`${url}/:partnerId/`}>
                    <Box width={{ base: 'full', desktop: '80%' }} marginX="auto">
                        <PartnerInfo />
                    </Box>
                </Route>
                <FormRoute path={`${url}/:partnerId/ny`} title="Legg til ny avtale">
                    <AvtaleForm />
                </FormRoute>
                <FormRoute path={`${url}/:partnerId/rediger`} title="Rediger avtale">
                    <AvtaleForm />
                </FormRoute>
                <FormRoute path={`${url}/:partnerId/henteplan/ny`} title="Legg til ny henteplan">
                    <AddHenteplanForm />
                </FormRoute>
                <FormRoute path={`${url}/:partnerId/henteplan/rediger`} title="Rediger henteplan">
                    <EditHenteplanForm />
                </FormRoute>
            </Stack>
        </>
    );
};

export default Avtaler;
