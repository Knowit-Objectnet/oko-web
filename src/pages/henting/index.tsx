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
            <Flex as="main" width="full" height="full" backgroundColor="surface">
                <Flex
                    width="2xl"
                    maxWidth="2xl"
                    marginX="auto"
                    direction="column"
                    padding="10"
                    paddingTop={{ base: '4', tablet: '14' }}
                    fontSize="18px"
                >
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
