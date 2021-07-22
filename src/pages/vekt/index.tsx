import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { MissingRegistration } from './components/MissingRegistration';
import { NoMissingRegistration } from './components/NoMissingRegistration';
import { useAuth } from '../../auth/useAuth';
import { useHentinger } from '../../services/henting/useHentinger';
import { ApiHenting, ApiHentingParams } from '../../services/henting/HentingService';
import { dateTimeToStringIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { subMonths } from 'date-fns';

const Vekt: React.FC = () => {
    const { user } = useAuth();
    const before = new Date();
    before.setMinutes(0, 0, 0);
    const after = subMonths(before, 2);
    const hentingParametere: ApiHentingParams = {
        after: dateTimeToStringIgnoreTimezone(after),
        before: dateTimeToStringIgnoreTimezone(before),
    };

    if (user.isStasjon) hentingParametere.stasjonId = user.aktorId;
    else if (user.isPartner) hentingParametere.aktorId = user.aktorId;

    const { data: hentinger } = useHentinger(hentingParametere, { keepPreviousData: true });
    const hentingType: Array<ApiHenting> = [];

    hentinger?.map((hentinger) => {
        if (hentinger.planlagtHenting) hentingType.push(hentinger.planlagtHenting);
        if (hentinger.ekstraHenting) hentingType.push(hentinger.ekstraHenting);
    });

    const manglerVeiing: Array<ApiHenting> = [];
    const registrertVekt: Array<ApiHenting> = [];
    hentingType.forEach((henting) => {
        if (henting.vektregistreringer.length <= 0) manglerVeiing.push(henting);
        else registrertVekt.push(henting);
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
