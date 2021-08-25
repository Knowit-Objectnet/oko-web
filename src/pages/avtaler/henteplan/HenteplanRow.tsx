import * as React from 'react';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { ButtonGroup, Td, Tr, Text, useBreakpointValue, useBreakpoint } from '@chakra-ui/react';
import { formatDate, formatTime } from '../../../utils/formatDateTime';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { parseISO } from 'date-fns';
import { DeleteHenteplanButton } from './DeleteHenteplanButton';
import { useAuth } from '../../../auth/useAuth';
import { EditHenteplanButton } from './EditHenteplanButton';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { KategoriList } from '../../../components/kategorier/KategoriList';
import { Box } from '@chakra-ui/layout';

const FREKVENS: Record<HenteplanFrekvens, string> = {
    ENKELT: 'Én gang',
    UKENTLIG: 'Ukentlig',
    ANNENHVER: 'Annenhver uke',
};

const UKEDAG: Record<Weekday, string> = {
    MONDAY: 'Mandag',
    TUESDAY: 'Tirsdag',
    WEDNESDAY: 'Onsdag',
    THURSDAY: 'Torsdag',
    FRIDAY: 'Fredag',
    SATURDAY: 'Lørdag',
    SUNDAY: 'Søndag',
};

const getPeriodeCellContent = (henteplan: ApiHenteplan) => (
    <>
        <Text as="time" dateTime={henteplan.startTidspunkt} whiteSpace="nowrap">
            {formatDate(parseISO(henteplan.startTidspunkt))}
        </Text>
        {henteplan.frekvens !== 'ENKELT' ? (
            <>
                &ndash;&#8203;
                <Text as="time" dateTime={henteplan.sluttTidspunkt} whiteSpace="nowrap">
                    {formatDate(parseISO(henteplan.sluttTidspunkt))}
                </Text>
            </>
        ) : null}
    </>
);

const getTidsromCellContent = (henteplan: ApiHenteplan) => (
    <>
        <time>{formatTime(parseISOIgnoreTimezone(henteplan.startTidspunkt))}</time>
        &ndash;
        <time>{formatTime(parseISOIgnoreTimezone(henteplan.sluttTidspunkt))}</time>
    </>
);

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
}

export const HenteplanRow: React.FC<Props> = ({ henteplan, avtale }) => {
    // TODO: handle loading/error
    const { data: stasjon } = useStasjonById(henteplan.stasjonId);
    const { user } = useAuth();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    return (
        <Tr
            key={henteplan.id}
            verticalAlign="top"
            display={{ base: 'flex', tablet: 'table-row' }}
            flexDir="column"
            backgroundColor={{ base: 'white', tablet: 'inherit' }}
            marginTop={{ base: '4', tablet: '0' }}
        >
            {isSmallScreen ? (
                <Td>
                    <Box display="flex" justifyContent="space-between" fontWeight="bold">
                        <Box>{UKEDAG[henteplan.ukedag]}</Box>
                        <Box>{getTidsromCellContent(henteplan)}</Box>
                        <Box>{stasjon?.navn}</Box>
                    </Box>

                    <Box display="flex" marginTop="4" marginBottom="4">
                        <Box marginRight="4">{FREKVENS[henteplan.frekvens]}</Box>
                        <Box>{getPeriodeCellContent(henteplan)}</Box>
                    </Box>

                    <KategoriList
                        kategorier={henteplan.kategorier.map((henteplanKategori) => henteplanKategori.kategori)}
                    />

                    {user.isAdmin ? (
                        <ButtonGroup spacing="3" size="xs" marginTop="4">
                            <EditHenteplanButton henteplan={henteplan} avtale={avtale} />
                            <DeleteHenteplanButton henteplan={henteplan} />
                        </ButtonGroup>
                    ) : null}
                </Td>
            ) : (
                <React.Fragment>
                    <Td>{UKEDAG[henteplan.ukedag]}</Td>
                    <Td>{getTidsromCellContent(henteplan)}</Td>
                    <Td>{stasjon?.navn}</Td>
                    <Td>{FREKVENS[henteplan.frekvens]}</Td>
                    <Td>{getPeriodeCellContent(henteplan)}</Td>
                    <Td paddingY="2.5">
                        <KategoriList
                            kategorier={henteplan.kategorier.map((henteplanKategori) => henteplanKategori.kategori)}
                        />
                    </Td>
                    <Td textAlign="end">
                        {user.isAdmin ? (
                            <ButtonGroup spacing="3" size="xs">
                                <EditHenteplanButton henteplan={henteplan} avtale={avtale} />
                                <DeleteHenteplanButton henteplan={henteplan} />
                            </ButtonGroup>
                        ) : null}
                    </Td>
                </React.Fragment>
            )}
        </Tr>
    );
};
