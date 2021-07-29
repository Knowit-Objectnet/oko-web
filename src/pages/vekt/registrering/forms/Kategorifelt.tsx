import * as React from 'react';
import { HStack, Tag } from '@chakra-ui/react';
import { VektObject } from '../Vektregistrering';
import { Registreringsfelt } from './Registreringfelt';

interface Props {
    id: string;
    vektObject: VektObject;
}

export const Kategorifelt: React.FC<Props> = ({ vektObject }) => {
    return (
        <HStack justifyContent="flex-end" alignItems="center" alignSelf="stretch" marginBottom={3} spacing={4}>
            <Tag variant="kategori">{vektObject.navn}</Tag>
            <Registreringsfelt vektObject={vektObject} />
        </HStack>
    );
};
