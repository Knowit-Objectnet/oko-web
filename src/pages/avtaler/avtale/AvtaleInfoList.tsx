import * as React from 'react';
import { Accordion, Stack } from '@chakra-ui/react';
import { AvtaleInfoItem, getAvtaleTitle } from './AvtaleInfoItem';
import { compareDesc, parseISO } from 'date-fns';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useAvtaler } from '../../../services/avtale/useAvtaler';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoList: React.FC<Props> = ({ partner }) => {
    // TODO: loading/error handling
    const { data: avtaler, isLoading, isError } = useAvtaler({ aktorId: partner.id });

    const sortedAvtalerBySluttDato = (avtaler ?? []).sort((avtaleA, avtaleB) =>
        compareDesc(parseISO(avtaleA.sluttDato), parseISO(avtaleB.sluttDato)),
    );

    const sortedAvtaler = (sortedAvtalerBySluttDato ?? []).sort((avtaleA, avtaleB) =>
        getAvtaleTitle(avtaleA).localeCompare(getAvtaleTitle(avtaleB)),
    );

    if (isLoading) {
        return <>Laster inn...</>;
    }

    if (isError) {
        return <>Noe gikk galt ved henting av avtaler.</>;
    }

    if (sortedAvtaler.length <= 0) {
        return <>Ingen registrerte avtaler</>;
    }

    return (
        <Accordion allowToggle allowMultiple>
            <Stack direction="column" spacing="3" alignItems="stretch">
                {sortedAvtaler.map((avtale) => (
                    <AvtaleInfoItem key={avtale.id} avtale={avtale} partner={partner} />
                ))}
            </Stack>
        </Accordion>
    );
};
