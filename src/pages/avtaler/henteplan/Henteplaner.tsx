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
        henteplaner = henteplaner.filter((henteplan) => {
            if (user.aktorId === henteplan.stasjonId) {
                return henteplan;
            }
        });
    }
    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                width="full"
                marginTop="4"
                marginBottom="3"
                paddingTop="3"
            >
                <Heading as="h4" fontSize="lg" fontWeight="bold">
                    {henteplaner.length > 0 ? 'Henteplaner' : 'Ingen registrerte henteplaner'}
                </Heading>
                {user.isAdmin ? (
                    <AddHenteplanButton backgroundColor="white" size="sm" avtale={avtale} partner={partner} />
                ) : null}
            </Flex>
            {henteplaner.length > 0 ? <HenteplanTable avtale={avtale} /> : null}
        </>
    );
};
