import * as React from 'react';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { ButtonGroup, TableCellProps, Td, Tr, Text } from '@chakra-ui/react';
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

export const TextTableCell: React.FC<TableCellProps> = ({ children, ...props }) => (
    <Td paddingY="3" {...props}>
        {children}
    </Td>
);

export const HenteplanRow: React.FC<Props> = ({ henteplan, avtale }) => {
    // TODO: handle loading/error
    const { data: stasjon } = useStasjonById(henteplan.stasjonId);

    return (
        <Tr key={henteplan.id} verticalAlign="top">
            <TextTableCell>
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
            </TextTableCell>
            <TextTableCell>{FREKVENS[henteplan.frekvens]}</TextTableCell>
            <TextTableCell>{UKEDAG[henteplan.ukedag]}</TextTableCell>
            <TextTableCell>{stasjon?.navn}</TextTableCell>
            <TextTableCell>
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.startTidspunkt))}</time>
                &ndash;
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.sluttTidspunkt))}</time>
            </TextTableCell>
            <Td>
                <KategoriList
                    kategorier={henteplan.kategorier.map((henteplanKategori) => henteplanKategori.kategori)}
                />
            </Td>
            <TextTableCell textAlign="end">
                <ButtonGroup spacing="4" size="sm">
                    <EditHenteplanButton henteplan={henteplan} avtale={avtale} />
                    <DeleteHenteplanButton henteplan={henteplan} />
                </ButtonGroup>
            </TextTableCell>
        </Tr>
    );
};
