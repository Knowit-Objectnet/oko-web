import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Flex } from '@chakra-ui/layout';
import { PartnerInfoHeader } from './PartnerInfoHeader';
import { KontaktPersonSection } from '../kontaktperson/KontaktPersonSection';
import { AvtaleInfoSection } from '../avtale/AvtaleInfoSection';
import { usePartnerById } from '../../../services/partner/usePartnerById';

export const PartnerInfo: React.FC = () => {
    const { params } = useRouteMatch<{ partnerId: string }>();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    const { data: partner, isLoading, isError } = usePartnerById(params.partnerId);

    if (!params.partnerId) {
        return null;
    }

    if (isLoading) {
        return <>Laster inn...</>;
    }

    if (isError) {
        return <>Noe gikk galt ved henting av avtaler.</>;
    }

    if (!partner) {
        return <>Kunne ikke finne denne partneren.</>;
    }

    return (
        <Flex as="main" alignItems="flex-start" direction="column" flex="1" height="full">
            <PartnerInfoHeader partner={partner} />
            <AvtaleInfoSection partner={partner} />
            <KontaktPersonSection kontaktPersoner={partner.kontaktPersoner} />
        </Flex>
    );
};
