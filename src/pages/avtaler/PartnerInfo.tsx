import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Flex } from '@chakra-ui/layout';
import { PartnerInfoHeader } from './PartnerInfoHeader';
import { KontaktPersonSection } from './KontaktPersonSection';
import { AvtaleInfoSection } from './AvtaleInfoSection';
import { mockPartnere } from '../../../__mocks__/mocks-new/mockAktor';

export const PartnerInfo: React.FC = () => {
    const { params } = useRouteMatch<{ partnerId: string }>();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    // const { data: partner } = usePartnerById(params.partnerId);

    const partner = mockPartnere.find((partner) => partner.id === params.partnerId);

    return (
        <Flex as="main" alignItems="flex-start" direction="column" flex="1" height="full">
            {partner ? (
                <>
                    <PartnerInfoHeader partner={partner} />
                    <AvtaleInfoSection partner={partner} />
                    <KontaktPersonSection kontaktPersoner={partner.kontaktPersoner} />
                </>
            ) : (
                <>Laster data...</>
            )}
        </Flex>
    );
};