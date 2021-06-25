import * as React from 'react';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { ButtonGroup, Td, Tr, Text } from '@chakra-ui/react';
import { formatDate, formatTime } from '../../../utils/formatDateTime';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { parseISO } from 'date-fns';
import { DeleteHenteplanButton } from './DeleteHenteplanButton';
import { EditHenteplanButton } from './EditHenteplanButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';
import { KategoriList } from '../../../components/KategoriList';

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

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
}

export const HenteplanRow: React.FC<Props> = ({ henteplan, avtale }) => {
    // TODO: handle loading/error
    const { data: stasjon } = useStasjonById(henteplan.stasjonId);

    return (
        <Tr key={henteplan.id} verticalAlign="top">
            <Td>
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
            </Td>
            <Td>{FREKVENS[henteplan.frekvens]}</Td>
            <Td>{UKEDAG[henteplan.ukedag]}</Td>
            <Td>{stasjon?.navn}</Td>
            <Td>
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.startTidspunkt))}</time>
                &ndash;
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.sluttTidspunkt))}</time>
            </Td>
            <Td paddingY="2.5">
                <KategoriList
                    kategorier={henteplan.kategorier.map((henteplanKategori) => henteplanKategori.kategori)}
                />
            </Td>
            <Td textAlign="end">
                <ButtonGroup spacing="3" size="sm">
                    <EditHenteplanButton henteplan={henteplan} avtale={avtale} />
                    <DeleteHenteplanButton henteplan={henteplan} />
                </ButtonGroup>
            </Td>
        </Tr>
    );
};
