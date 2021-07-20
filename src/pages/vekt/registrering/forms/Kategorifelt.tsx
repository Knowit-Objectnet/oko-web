import * as React from 'react';
import { HStack } from '@chakra-ui/react';

import { Vektobjekt } from '../Vektregistrering';
import { KategoriBadge } from '../../components/KategoriBadge';
import { Registreringsfelt } from './Registreringfelt';

interface Props {
    id: string;
    vektobjekt: Vektobjekt;
    onChange: (vektobjekt: Vektobjekt) => void;
}

export const Kategorifelt: React.FC<Props> = ({ onChange, vektobjekt }) => {
    return (
        <>
            <HStack justifyContent="flex-end" alignItems="center" alignSelf="stretch" marginBottom={3} spacing={4}>
                <KategoriBadge name={vektobjekt.navn} />
                <Registreringsfelt vektobjekt={vektobjekt} onChange={onChange} />
            </HStack>
        </>
    );
};
