import { Heading, HStack } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import * as React from 'react';
import { useAuth } from '../../../auth/useAuth';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { BadgeDetail } from './BadgeDetail';
import Varsel from '../../../assets/Varsel.svg';
import { colors } from '../../../theme/foundations/colors';
import { DetailVektInfo } from './DetailVektInfo';

interface Props {
    henting: ApiHentingWrapper;
}

export const DetailHeader: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();

    const getPlanlagtHentingTitle = (): string | undefined => {
        if (user.isPartner) `Din henting hos ${henting.stasjonNavn}`;
        return henting.aktorNavn;
    };

    const getEkstraHentingTitle = (): string => {
        const userIsGodkjentPartner = henting.ekstraHenting?.godkjentUtlysning?.partnerNavn === user.aktorId;
        const godkjentPartnerNavn = henting.ekstraHenting?.godkjentUtlysning?.partnerNavn;

        if (user.isPartner && userIsGodkjentPartner) return `Din henting hos ${henting.stasjonNavn}`;

        if (user.isPartner) return `Ekstrahenting på ${henting.stasjonNavn}`;

        if (godkjentPartnerNavn) return godkjentPartnerNavn;

        return 'Ekstrahenting';
    };

    const getEkstraHentingBadges = () => {
        const missingGodkjentPartner = !henting.ekstraHenting?.godkjentUtlysning;

        return (
            <>
                <BadgeDetail text="Ekstrahenting" color={colors.Green} minWidth="4xs" />
                {missingGodkjentPartner ? (
                    <BadgeDetail text="Ingen påmeldte" color={colors.Red} minWidth="4xs" />
                ) : null}
            </>
        );
    };

    return (
        <HStack alignItems="center" spacing="3">
            {henting.ekstraHenting && user.isPartner ? (
                <Icon as={Varsel} transform="translateY(-2px)" boxSize="4rem" aria-hidden />
            ) : null}
            <Heading as="h1" fontWeight="normal" fontSize="3xl">
                {henting.ekstraHenting ? getEkstraHentingTitle() : getPlanlagtHentingTitle()}
            </Heading>
            {henting.ekstraHenting ? getEkstraHentingBadges() : null}
            <DetailVektInfo henting={henting} />
        </HStack>
    );
};
