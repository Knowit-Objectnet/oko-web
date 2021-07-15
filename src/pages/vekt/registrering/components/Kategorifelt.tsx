import * as React from 'react';
import { HStack } from '@chakra-ui/react';
import { Registreringsfelt } from './Registreringfelt';
import { Vektobjekt } from '../Vektregistrering';
import { KategoriBadge } from '../../components/KategoriBadge';

interface Props {
    id: string;
    name: string;
    vektobjekt: Vektobjekt;
    onChange: (vektobjekt: Vektobjekt) => void;
}

export const Kategorifelt: React.FC<Props> = ({ name, onChange, vektobjekt }) => {
    return (
        <>
            <HStack
                justifyContent="flex-end"
                alignItems="center"
                padding={2.5}
                alignSelf="stretch"
                marginBottom={3}
                spacing={4}
            >
                <KategoriBadge name={name} />
                <Registreringsfelt vektobjekt={vektobjekt} onChange={onChange} />
            </HStack>
        </>
    );
};
