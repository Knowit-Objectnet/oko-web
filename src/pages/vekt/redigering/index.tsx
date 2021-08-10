import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import { useRouteMatch } from 'react-router-dom';
import { Vektregistrering } from '../registrering/Vektregistrering';

const Redigering: React.FC = () => {
    const { params } = useRouteMatch<{ hentingId?: string }>();

    return (
        <>
            <Helmet>
                <title>Redigering av vekt</title>
            </Helmet>
            <Flex
                as="main"
                width="full"
                minHeight="full"
                backgroundColor="surface"
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                padding={10}
            >
                {params.hentingId ? (
                    <Vektregistrering hentingId={params.hentingId} label="Rediger vekt" />
                ) : (
                    'Klarte ikke å finne denne hentingen.'
                )}
            </Flex>
        </>
    );
};

export default Redigering;
