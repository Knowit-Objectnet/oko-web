import * as React from 'react';
import { Accordion, Stack } from '@chakra-ui/react';
import { AvtaleInfoItem } from './AvtaleInfoItem';
import { mockAvtaler } from '../../../__mocks__/mocks-new/mockAvtale';
import { ApiPartner } from '../../services-currentapi/PartnerService';
import { compareDesc, parseISO } from 'date-fns';

interface Props {
    partner: ApiPartner;
}

export const AvtaleInfoList: React.FC<Props> = ({ partner }) => {
    const avtaler = mockAvtaler
        .filter((avtale) => avtale.aktor.id === partner?.id)
        .sort((avtaleA, avtaleB) => compareDesc(parseISO(avtaleA.startDato), parseISO(avtaleB.startDato)));

    return (
        <Accordion allowToggle allowMultiple>
            <Stack direction="column" spacing="3" alignItems="stretch">
                {avtaler.map((avtale) => (
                    <AvtaleInfoItem key={avtale.id} avtale={avtale} />
                ))}
            </Stack>
        </Accordion>
    );
};
