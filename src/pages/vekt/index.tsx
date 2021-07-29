import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { useAuth } from '../../auth/useAuth';
import { useHentinger } from '../../services/henting/useHentinger';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { compareDesc, endOfToday, subMonths } from 'date-fns';
import { partition } from 'lodash';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { HentingVektList } from './components/HentingVektList';
import { isMissingVekt, isNotInFuture, isValidForVektregistrering } from '../../utils/wrappedHentingHelpers';
import { HentingVektListWrapper } from './components/HentingVektListWrapper';

export const HentingerVektSection: React.FC = ({ children }) => (
    <VStack as="section" spacing="5" width="full" alignItems="flex-start">
        {children}
    </VStack>
);

export const HentingerVektHeader: React.FC = ({ children }) => (
    <Heading as="h2" fontSize="1.5rem" fontWeight="bold">
        {children}
    </Heading>
);

const Vekt: React.FC = () => {
    const { user } = useAuth();

    const before = endOfToday();
    const after = subMonths(before, 2);

    const {
        data: hentinger,
        isLoading,
        isError,
    } = useHentinger({
        after: dateTimeToStringIgnoreTimezone(after),
        before: dateTimeToStringIgnoreTimezone(before),
        stasjonId: user.isStasjon ? user.aktorId : undefined,
        aktorId: user.isPartner ? user.aktorId : undefined,
    });

    const sortedHentinger = hentinger
        ?.filter((henting) => isValidForVektregistrering(henting) && isNotInFuture(henting))
        .sort((hentingA, hentingB) =>
            compareDesc(
                parseISOIgnoreTimezone(hentingA.startTidspunkt),
                parseISOIgnoreTimezone(hentingB.startTidspunkt),
            ),
        );

    const [hentingerMissingVekt, hentingerWithVekt] = partition<ApiHentingWrapper>(sortedHentinger, isMissingVekt);

    return (
        <>
            <Helmet>
                <title>Vekt</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="10"
                paddingX={{ base: '6', desktop: '10' }}
                marginX="auto"
                width={{ base: 'full', xl: '90%' }}
                maxWidth={{ base: 'full', desktop: 'container.xl' }}
            >
                <Heading width="full" as="h1" fontWeight="normal" fontSize="4xl" marginBottom="4">
                    Vektregistrering
                </Heading>
                <VStack spacing="8" alignItems="flex-start">
                    <HentingerVektSection>
                        <HentingerVektHeader>Hentinger som mangler vekt</HentingerVektHeader>
                        <HentingVektListWrapper isLoading={isLoading} isError={isError}>
                            <HentingVektList missingVekt hentinger={hentingerMissingVekt} />
                        </HentingVektListWrapper>
                    </HentingerVektSection>
                    <HentingerVektSection>
                        <HentingerVektHeader>Tidligere vektregistreringer </HentingerVektHeader>
                        <HentingVektListWrapper isLoading={isLoading} isError={isError}>
                            <HentingVektList hentinger={hentingerWithVekt} />
                        </HentingVektListWrapper>
                    </HentingerVektSection>
                </VStack>
            </Flex>
        </>
    );
};

export default Vekt;
