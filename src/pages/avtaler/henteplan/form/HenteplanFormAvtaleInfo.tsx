import * as React from 'react';
import { ApiAvtale } from '../../../../services/avtale/AvtaleService';
import { FormInfoBody, FormInfoHeading, FormInfoSection } from '../../../../components/forms/FormInfoSection';
import { AVTALE_TYPE, getAvtaleTitle } from '../../avtale/AvtaleInfoItem';
import { formatDate } from '../../../../utils/formatDateTime';
import { parseISO } from 'date-fns';

export const getAvtaleVarighetString = (avtale: ApiAvtale): string =>
    `fra ${formatDate(parseISO(avtale.startDato))} til ${formatDate(parseISO(avtale.sluttDato))}`;

export const HenteplanFormAvtaleInfo: React.FC<{ avtale: ApiAvtale }> = ({ avtale }) => (
    <FormInfoSection>
        <FormInfoHeading>Gjelder for {getAvtaleTitle(avtale).toLowerCase()}:</FormInfoHeading>
        <FormInfoBody>
            {AVTALE_TYPE[avtale.type]} {getAvtaleVarighetString(avtale)}
        </FormInfoBody>
    </FormInfoSection>
);
