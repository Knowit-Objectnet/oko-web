import { NavLink, useRouteMatch } from 'react-router-dom';
import { Link, Tag } from '@chakra-ui/react';
import * as React from 'react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { Box } from '@chakra-ui/layout';
import { parseISO } from 'date-fns';
import { AVTALE_TYPE, getAvtaleTitle } from '../avtale/AvtaleInfoItem';
import { isNull } from 'lodash';
import { formatDate } from '../../../utils/formatDateTime';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';

interface Props {
    partner: ApiPartner;
}

export const PartnerNavItem: React.FC<Props> = ({ partner }) => {
    const { url } = useRouteMatch();
    const getNyesteAvtale = (avtaler: Array<ApiAvtale>): ApiAvtale | null => {
        if (avtaler.length == 0) return null;

        const compare = (a: ApiAvtale, b: ApiAvtale): number => {
            const aTitle = getAvtaleTitle(a);
            const bTitle = getAvtaleTitle(b);
            const prio: Record<string, number> = {
                'Aktiv avtale': -1,
                'Kommende avtale': 1,
                'Tidligere avtale': 2,
                'Avtale med udefinert tidsrom': 3,
            };

            if (aTitle == bTitle) return a.type == 'FAST' ? -1 : 1;

            return prio[aTitle] - prio[bTitle];
        };

        avtaler.sort((a, b) => compare(a, b));
        return avtaler[0];
    };

    const nyesteAvtale = getNyesteAvtale(partner.avtaler);

    return (
        <Link
            as={NavLink}
            to={`${url}/${partner.id}`}
            display={{ base: 'grid', tablet: 'flex' }}
            gridTemplateColumns={{ base: '50% 50%', handheld: '65% 35%' }}
            gridTemplateAreas="'title tag' 'avtale henteplan'"
            gridRowGap="4"
            justifyContent="flex-start"
            alignItems="center"
            flexDir={{ base: 'column', tablet: 'row' }}
            position="relative"
            lineHeight="1.2"
            backgroundColor="surface"
            padding="4"
        >
            <Box fontWeight="bold" gridArea="title">
                {partner.navn}
            </Box>

            {isNull(nyesteAvtale) ? (
                <Box marginLeft="auto" gridArea="tag">
                    Ingen Avtale
                </Box>
            ) : (
                <React.Fragment>
                    <Box fontSize="12" marginX={{ base: '0', tablet: '4' }} gridArea="avtale">
                        {AVTALE_TYPE[nyesteAvtale.type]} fra &nbsp;
                        {formatDate(parseISO(nyesteAvtale.startDato))} til &nbsp;
                        {formatDate(parseISO(nyesteAvtale.sluttDato))}
                    </Box>

                    <Box fontSize="12" gridArea="henteplan" marginLeft={{ base: 'auto', tablet: 'inherit' }}>
                        {nyesteAvtale.henteplaner.length} &nbsp;
                        {nyesteAvtale.henteplaner.length == 1 ? 'henteplan' : 'henteplaner'}
                    </Box>

                    <Box marginLeft="auto" fontSize="12" gridArea="tag">
                        <Tag
                            variant={getAvtaleTitle(nyesteAvtale) == 'Aktiv avtale' ? 'aktivAvtale' : 'kommendeAvtale'}
                        >
                            {getAvtaleTitle(nyesteAvtale)}
                        </Tag>
                    </Box>
                </React.Fragment>
            )}
        </Link>
    );
};
