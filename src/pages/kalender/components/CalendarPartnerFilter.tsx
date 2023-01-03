import * as React from 'react';
import { usePartnere } from '../../../services/partner/usePartnere';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { partnerHasUtlysning } from '../../../utils/ekstraHentingHelpers';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { useAuth } from '../../../auth/useAuth';

const partnerFilterFnFactory = (partnerIds: Array<string>) => {
    return (henting: ApiHentingWrapper) =>
        partnerIds.some((partnerId) => {
            const partnerOwnsHenting = henting.aktorId === partnerId;
            const partnerCanAcceptEkstraHenting =
                !henting.ekstraHenting?.godkjentUtlysning && partnerHasUtlysning(henting.ekstraHenting, partnerId);
            return partnerOwnsHenting || partnerCanAcceptEkstraHenting;
        });
};

const sortFilteredItems = (a: ApiPartner | ApiStasjon, b: ApiPartner | ApiStasjon): number => {
    if (a.navn[0] === '*') {
        return 1;
    } else if (b.navn[0] === '*') {
        return -1;
    } else {
        return 0;
    }
};

interface Props {
    selectedPartnerIds: Array<string>;
    setSelectedPartnerIds: (stasjonIds: Array<string>) => void;
}

export const CalendarPartnerFilter: React.FC<Props> = ({ selectedPartnerIds, setSelectedPartnerIds }) => {
    const partnerQuery = usePartnere({ params: { includeAvtaler: true } });
    const today = new Date();
    const user = useAuth();

    const filteredPartnerData: Array<ApiPartner> = ((partnerQuery.data as Array<ApiPartner>) || [])
        ?.sort(sortFilteredItems)
        .filter((partner: ApiPartner) =>
            partner?.avtaler?.some((avtale: ApiAvtale) => {
                if (new Date(avtale?.sluttDato) > today) {
                    return avtale?.henteplaner?.some(
                        (henteplan: ApiHenteplan) => henteplan?.stasjonId == user.user.aktorId,
                    );
                }
            }),
        );

    return (
        <CalendarFilterSelect
            labels={{ title: 'Filtrer på partner', error: 'Beklager, klarte ikke hente partnere.' }}
            name="partnerFilter"
            data={user.user.isStasjon ? filteredPartnerData : partnerQuery.data}
            isLoading={partnerQuery.isLoading}
            isLoadingError={partnerQuery.isLoadingError}
            filterFnFactory={partnerFilterFnFactory}
            selectedAktorIds={selectedPartnerIds}
            setSelectedAktorIds={setSelectedPartnerIds}
        />
    );
};
