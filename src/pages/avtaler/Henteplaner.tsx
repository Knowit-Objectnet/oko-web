import * as React from 'react';
import { ApiHenteplanDownstream } from '../../services-new/HenteplanService';
import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { AddButton } from '../../components/buttons/AddButton';
import { HenteplanTable } from './HenteplanTable';

interface Props {
    henteplaner: Array<ApiHenteplanDownstream>;
}

export const Henteplaner: React.FC<Props> = ({ henteplaner }) => (
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
            <AddButton
                size="sm"
                label="Legg til henteplan"
                onClick={() => {
                    console.log('Legg til ny henteplan');
                }}
            />
        </Flex>
        {henteplaner.length > 0 ? <HenteplanTable henteplaner={henteplaner} /> : null}
    </>
);
