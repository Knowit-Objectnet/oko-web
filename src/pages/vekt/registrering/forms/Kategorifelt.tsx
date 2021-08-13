import * as React from 'react';
import { HStack, Tag } from '@chakra-ui/react';
import { VektObject } from '../Vektregistrering';
import { Registreringsfelt } from './Registreringfelt';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    id: string;
    vektObject: VektObject;
    setVekt: Dispatch<SetStateAction<Record<string, number>>>;
}

export const Kategorifelt: React.FC<Props> = ({ vektObject, setVekt }) => {
    return (
        <HStack justifyContent="flex-end" alignItems="center" alignSelf="stretch" marginBottom={3} spacing={4}>
            <Tag variant="kategori">{vektObject.navn}</Tag>
            <Registreringsfelt vektObject={vektObject} setVekt={setVekt} />
        </HStack>
    );
};
