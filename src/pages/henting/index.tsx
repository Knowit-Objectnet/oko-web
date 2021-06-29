import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/layout';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { usePlanlagtHentingById } from '../../services/henting/usePlanlagtHentingById';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { KategoriList } from '../../components/KategoriList';
import { VisuallyHidden } from '@chakra-ui/react';
import { isToday } from 'date-fns';

const getDayString = (date: Date) => {
    if (isToday(date)) {
        return 'I dag';
    }
    return formatDate(date);
};

const Henting: React.FC = () => {
    const location = useLocation<{ henting?: ApiPlanlagtHenting }>();

    const routeMatch = useRouteMatch<{ hentingId?: string }>();
    const { data, isLoading, error } = usePlanlagtHentingById(routeMatch.params.hentingId || '', {
        initialData: location?.state?.henting,
        enabled: routeMatch.params.hentingId !== undefined,
    });

    return (
        <>
            <Helmet>
                {/*TODO: create title from calendar state*/}
                <title>Kalender</title>
            </Helmet>
            {data ? (
                <Flex as="main" width="full" height="full" backgroundColor="surface">
                    <Flex width="4xl" maxWidth="4xl" marginX="auto" direction="column">
                        <dl>
                            <VisuallyHidden as="dt">Tidspunkt</VisuallyHidden>
                            <dd>
                                {getDayString(parseISOIgnoreTimezone(data?.startTidspunkt))}
                                {` kl. `}
                                {formatTime(parseISOIgnoreTimezone(data?.startTidspunkt))}
                            </dd>
                            <VisuallyHidden as="dt">Stasjon</VisuallyHidden>
                            <dd>{data?.stasjonNavn}</dd>
                            {data?.merknad ? (
                                <>
                                    <dt>Merknad</dt>
                                    <dd>{data.merknad}</dd>
                                </>
                            ) : null}
                            <dt>Kategorier</dt>
                            <dd>
                                <KategoriList kategorier={(data?.kategorier || []).map(({ kategori }) => kategori)} />
                            </dd>
                        </dl>
                        <button onClick={() => console.log('Avlys henting')}>Avlys</button>
                    </Flex>
                </Flex>
            ) : (
                'Laster data'
            )}
        </>
    );
};

export default Henting;
