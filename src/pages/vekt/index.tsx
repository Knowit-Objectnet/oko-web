import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { MissingRegistration } from './components/MissingRegistration';
import { NoMissingRegistration } from './components/NoMissingRegistration';
import { useAuth } from '../../auth/useAuth';
import { useHentinger } from '../../services/henting/useHentinger';
import { ApiHenting, ApiHentingParams } from '../../services/henting/HentingService';

const Vekt: React.FC = () => {
    const { user } = useAuth();
    const hentingeParametere: ApiHentingParams = { aktorId: user.aktorId };
    const { data: hentinger } = useHentinger(hentingeParametere);

    const h: Array<ApiHenting> = [];
    hentinger?.map((hentinger) => {
        if (hentinger.planlagtHenting) h.push(hentinger.planlagtHenting);
        if (hentinger.ekstraHenting) h.push(hentinger.ekstraHenting);
    });

    const today = new Date();
    const manglerVeiing: Array<ApiHenting> = [];
    const registrertVekt: Array<ApiHenting> = [];
    h.forEach((henting) => {
        if (new Date(henting.sluttTidspunkt) <= today && henting.vektregistreringer.length <= 0)
            manglerVeiing.push(henting);
        else if (new Date(henting.sluttTidspunkt) <= today && henting.vektregistreringer.length >= 1)
            registrertVekt.push(henting);
    });

    return (
        <>
            <Helmet>
                <title>Vekt</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                marginY="5"
                width={{ base: '100%', desktop: '80%' }}
            >
                <Flex direction="column" height="100%">
                    <Flex direction="column" marginBottom={20}>
                        <Heading as="h2" fontSize="1.5rem" fontWeight="bold">
                            Hentinger som mangler vekt
                        </Heading>
                        <Flex direction="column">
                            {manglerVeiing.map((henting) => {
                                return <MissingRegistration key={henting.id} henting={henting} />;
                            })}
                        </Flex>
                    </Flex>
                    <Flex direction="column">
                        <Heading as="h2" fontSize="1.5rem" fontWeight={400}>
                            Tidligere veiinger
                        </Heading>
                        <Flex direction="column">
                            {registrertVekt.map((henting) => {
                                return <NoMissingRegistration key={henting.id} henting={henting} />;
                            })}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Vekt;
