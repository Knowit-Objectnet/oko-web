import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { mockPartnere as partnere } from '../../../__mocks__/mocks-new/mockAktor';
import { mockAvtaler } from '../../../__mocks__/mocks-new/mockAvtale';
import { Box, Flex } from '@chakra-ui/layout';
import { Button, Heading, Icon } from '@chakra-ui/react';
import Pencil from '../../assets/Pencil.svg';
import {
    PartnerInfoSection,
    PartnerInfoSectionButtons,
    PartnerInfoSectionContent,
    PartnerInfoSectionHeader,
    PartnerInfoSectionTitle,
} from './PartnerInfoSection';
import Plus from '../../assets/Plus.svg';
import { KontaktTable } from './KontaktTable';
import { ApiAvtale } from '../../services-new/AvtaleService';
import { ApiKontakt, ApiPartner } from '../../services-new/AktorService';
import { AvtaleInfoList } from './AvtaleInfoList';

const AvtaleSection: React.FC<{ avtaler: ApiAvtale[] }> = ({ avtaler }) => (
    <PartnerInfoSection>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Avtaler</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <Button
                    leftIcon={<Icon as={Plus} />}
                    onClick={() => {
                        console.log('Legg til ny avtale');
                    }}
                >
                    Ny avtale
                </Button>
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            <AvtaleInfoList avtaler={avtaler} />
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);

const KontaktPersonSection: React.FC<{ kontaktPersoner: ApiKontakt[] }> = ({ kontaktPersoner }) => (
    <PartnerInfoSection>
        <PartnerInfoSectionHeader>
            <PartnerInfoSectionTitle>Kontaktpersoner</PartnerInfoSectionTitle>
            <PartnerInfoSectionButtons>
                <Button
                    leftIcon={<Icon as={Plus} />}
                    onClick={() => {
                        console.log('Legg til ny kontaktperson');
                    }}
                >
                    Ny kontaktperson
                </Button>
            </PartnerInfoSectionButtons>
        </PartnerInfoSectionHeader>
        <PartnerInfoSectionContent>
            {kontaktPersoner.length > 0 ? (
                <KontaktTable kontaktPersoner={kontaktPersoner} />
            ) : (
                'Ingen registrerte kontaktpersoner'
            )}
        </PartnerInfoSectionContent>
    </PartnerInfoSection>
);

const GeneralPartnerInfo: React.FC<{ partner: ApiPartner }> = ({ partner }) => (
    <Box
        as="section"
        backgroundColor="gray.100"
        width="100%"
        padding={5}
        marginBottom={4}
        sx={{
            'dt, dd': {
                display: 'inline',
                marginRight: '1',
            },
        }}
    >
        {/*TODO: mangler tittel i denne seksjonen */}
        <dl>
            <Box>
                <dt>Størrelse:</dt>
                <dd>{partner.storrelse}</dd>
            </Box>
            <Box>
                <dt>Ideell organisasjon:</dt>
                <dd>{partner.ideell ? 'Ja' : 'Nei'}</dd>
            </Box>
        </dl>
    </Box>
);

const PartnerInfoHeader: React.FC<{ partner: ApiPartner }> = ({ partner }) => (
    <Flex justifyContent="space-between" width="100%" marginY={4} alignItems="center">
        <Heading as="h1" fontWeight="medium" fontSize="4xl">
            {partner.navn}
        </Heading>
        <Button
            size="sm"
            leftIcon={<Icon as={Pencil} />}
            onClick={() => {
                console.log('Rediger partner');
            }}
        >
            Rediger partner
        </Button>
    </Flex>
);

export const PartnerInfo: React.FC = () => {
    const { params } = useRouteMatch<{ partnerId: string }>();

    // TODO: handle invalid partner Id and handle loading state more gracefully
    // const { data: partner } = usePartnerById(Number(params.partnerId));

    const partner = partnere.find((partner) => partner.id === params.partnerId);
    const avtaler = mockAvtaler.filter((avtale) => avtale.aktor.id === partner?.id);

    return (
        <Flex as="main" alignItems="flex-start" direction="column" flex={1}>
            {partner ? (
                <>
                    <PartnerInfoHeader partner={partner} />
                    <GeneralPartnerInfo partner={partner} />
                    <AvtaleSection avtaler={avtaler} />
                    <KontaktPersonSection kontaktPersoner={partner.kontaktPersoner} />
                </>
            ) : (
                <>Laster data...</>
            )}
        </Flex>
    );
};
