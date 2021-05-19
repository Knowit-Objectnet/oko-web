import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { mockPartnere } from '../../../__mocks__/mocks-new/mockAktor';
import { mockAvtaler } from '../../../__mocks__/mocks-new/mockAvtale';
import { Flex } from '@chakra-ui/layout';
import { PartnerInfoHeader } from './PartnerInfoHeader';
import { AvtaleSection } from './AvtaleSection';
import { KontaktPersonSection } from './KontaktPersonSection';

export const PartnerInfo: React.FC = () => {
    const { params } = useRouteMatch<{ partnerId: string }>();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    // const { data: partner } = usePartnerById(Number(params.partnerId));

    const partner = mockPartnere.find((partner) => partner.id === params.partnerId);
    const avtaler = mockAvtaler.filter((avtale) => avtale.aktor.id === partner?.id);

    return (
        <Flex as="main" alignItems="flex-start" direction="column" flex={1}>
            {partner ? (
                <>
                    <PartnerInfoHeader partner={partner} />
                    <AvtaleSection avtaler={avtaler} />
                    <KontaktPersonSection kontaktPersoner={partner.kontaktPersoner} />
                </>
            ) : (
                <>Laster data...</>
            )}
        </Flex>
    );
};
