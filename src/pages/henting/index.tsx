import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import { useRouteMatch } from 'react-router-dom';
import { HentingDetails } from './HentingDetails';

const Henting: React.FC = () => {
    const { params } = useRouteMatch<{ hentingId?: string }>();

    return (
        <>
            <Helmet>
                <title>Detaljer for henting</title>
            </Helmet>
            <Flex as="main" width="full" minHeight="full" backgroundColor="surface" direction="column">
                <Flex marginX="auto" padding="10" paddingTop={{ base: '10', tablet: '20' }} fontSize="18px">
                    {params.hentingId ? (
                        <HentingDetails hentingId={params.hentingId} />
                    ) : (
                        'Klarte ikke å finne denne hentingen.'
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default Henting;
