import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { PartnerInfoHeader } from '../avtaler/partner/PartnerInfoHeader';
import { KontaktPersonSection } from '../avtaler/kontaktperson/KontaktPersonSection';
import { AvtaleInfoSection } from '../avtaler/avtale/AvtaleInfoSection';
import { useAuth } from '../../auth/useAuth';
import { usePartnerById } from '../../services/partner/usePartnerById';
import { Helmet } from 'react-helmet';

export const PartnerInfo: React.FC = () => {
    const { user } = useAuth();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    const {
        data: partner,
        isLoading,
        isError,
    } = usePartnerById(user.aktorId || '', { enabled: user.aktorId !== undefined });

    if (!user.aktorId) {
        return null;
    }

    if (isLoading || !partner) {
        return <>Laster inn...</>;
    }

    if (isError) {
        return <>Noe gikk galt ved henting av avtaler.</>;
    }

    return (
        <>
            <Helmet>
                <title>Mine avtaler</title>
            </Helmet>
            <Flex
                as="main"
                alignItems="flex-start"
                direction="column"
                flex="1"
                paddingY="5"
                paddingX="10"
                height="full"
            >
                <PartnerInfoHeader partner={partner} />
                <AvtaleInfoSection partner={partner} />
                <KontaktPersonSection partner={partner} />
            </Flex>
        </>
    );
};

export default PartnerInfo;
