import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useAuth } from '../../auth/useAuth';
import { useHentinger } from '../../services/henting/useHentinger';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { compareDesc, endOfToday, subMonths } from 'date-fns';
import { partition } from 'lodash';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { HentingVektList } from './components/HentingVektList';
import { DownloadStatisticsButton } from './components/DownloadStatisticsButton';
import { hasVektregistrering, isValidForVektregistrering } from '../../utils/wrappedHentingHelpers';

export const HentingerVektSection: React.FC = ({ children }) => (
    <VStack as="section" spacing="5" width="full" alignItems="flex-start">
        {children}
    </VStack>
);

export const HentingerVektHeader: React.FC = ({ children }) => (
    <Heading as="h2" fontWeight="normal" fontSize="3xl">
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
        ?.filter(isValidForVektregistrering)
        .sort((hentingA, hentingB) =>
            compareDesc(
                parseISOIgnoreTimezone(hentingA.startTidspunkt),
                parseISOIgnoreTimezone(hentingB.startTidspunkt),
            ),
        );

    const [hentingerWithVekt, hentingerMissingVekt] = partition<ApiHentingWrapper>(
        sortedHentinger,
        hasVektregistrering,
    );

    return (
        <>
            <Helmet>
                <title>Vekt</title>
            </Helmet>
            <VStack
                as="main"
                paddingY="10"
                paddingX={{ base: '6', desktop: '10' }}
                marginX="auto"
                width={{ base: 'full', xl: '90%' }}
                maxWidth={{ base: 'full', desktop: 'container.xl' }}
                spacing="10"
                alignItems="flex-start"
            >
                <HStack>
                    <Heading width="full" as="h1" fontWeight="normal" fontSize="4xl" marginBottom="4">
                        Vektregistrering
                    </Heading>
                    {user.isAdmin ? <DownloadStatisticsButton /> : null}
                </HStack>
                <HentingerVektSection>
                    <HentingerVektHeader>Hentinger som mangler vekt</HentingerVektHeader>
                    <HentingVektList
                        missingVekt
                        hentinger={hentingerMissingVekt}
                        isError={isError}
                        isLoading={isLoading}
                    />
                </HentingerVektSection>
                <HentingerVektSection>
                    <HentingerVektHeader>Tidligere vektregistreringer</HentingerVektHeader>
                    <HentingVektList hentinger={hentingerWithVekt} isError={isError} isLoading={isLoading} />
                </HentingerVektSection>
            </VStack>
        </>
    );
};

export default Vekt;
