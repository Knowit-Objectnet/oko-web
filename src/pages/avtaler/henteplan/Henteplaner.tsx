import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { HenteplanTable } from './HenteplanTable';
import { AddHenteplanButton } from './AddHenteplanButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const Henteplaner: React.FC<Props> = ({ avtale, partner }) => {
    const { user } = useAuth();
    let henteplaner = avtale.henteplaner;
    if (user.isStasjon) {
        henteplaner = henteplaner.filter((henteplan) => user.aktorId === henteplan.stasjonId);
    }
    return (
        <>
            <Flex
                justifyContent="space-between"
                flexDir={{ base: 'column', handheld: 'row' }}
                width="full"
                marginTop="4"
                marginBottom="3"
                paddingTop="3"
            >
                <Heading as="h4" fontSize="lg" fontWeight="bold" marginBottom={{ base: '4', handheld: '0' }}>
                    {henteplaner.length > 0 ? 'Henteplaner' : 'Ingen registrerte henteplaner'}
                </Heading>
                {user.isAdmin ? (
                    <AddHenteplanButton
                        backgroundColor="white"
                        size="sm"
                        avtale={avtale}
                        partner={partner}
                        alignSelf="center"
                    />
                ) : null}
            </Flex>
            {henteplaner.length > 0 ? <HenteplanTable avtale={avtale} /> : null}
        </>
    );
};
