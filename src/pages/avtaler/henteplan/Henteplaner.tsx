import * as React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { HenteplanTable } from './HenteplanTable';
import { AddHenteplanButton } from './AddHenteplanButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiPartner } from '../../../services/partner/PartnerService';

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const Henteplaner: React.FC<Props> = ({ avtale, partner }) => {
    const henteplaner = avtale.henteplaner;

    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                width="full"
                borderTop="2px solid"
                borderColor="gray.200"
                marginTop="4"
                marginBottom="3"
                paddingTop="3"
            >
                <Heading as="h4" fontSize="lg" fontWeight="medium">
                    {henteplaner.length > 0 ? 'Henteplaner' : 'Ingen registrerte henteplaner'}
                </Heading>
                <AddHenteplanButton size="sm" avtale={avtale} partner={partner} />
            </Flex>
            {henteplaner.length > 0 ? <HenteplanTable avtale={avtale} /> : null}
        </>
    );
};
