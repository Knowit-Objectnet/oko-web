import { Flex, Heading, HStack } from '@chakra-ui/layout';
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
            <Flex direction="row">
                <BadgeDetail text="Ekstrahenting" color={colors.Green} />
                {missingGodkjentPartner ? (
                    <BadgeDetail marginLeft="0.3rem" text="Ingen påmeldte" color={colors.Red} minWidth="4xs" />
                ) : null}
            </Flex>
        );
    };

    return (
        <Flex direction="column">
            <Flex direction="row" marginBottom="1rem" align="center">
                {henting.ekstraHenting && user.isPartner ? (
                    <Icon as={Varsel} transform="translateY(-2px)" boxSize="4rem" aria-hidden />
                ) : null}
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    {henting.ekstraHenting ? getEkstraHentingTitle() : getPlanlagtHentingTitle()}
                </Heading>
            </Flex>
            {henting.ekstraHenting ? getEkstraHentingBadges() : null}
            <DetailVektInfo henting={henting} />
        </Flex>
    );
};
