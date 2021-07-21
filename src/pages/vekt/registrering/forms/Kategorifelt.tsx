import * as React from 'react';
import { HStack } from '@chakra-ui/react';

import { VektObject } from '../Vektregistrering';
import { KategoriBadge } from '../../components/KategoriBadge';
import { Registreringsfelt } from './Registreringfelt';

interface Props {
    id: string;
    vektObject: VektObject;
}

export const Kategorifelt: React.FC<Props> = ({ vektObject }) => {
    return (
        <>
            <HStack justifyContent="flex-end" alignItems="center" alignSelf="stretch" marginBottom={3} spacing={4}>
                <KategoriBadge name={vektObject.navn} />
                <Registreringsfelt vektObject={vektObject} />
            </HStack>
        </>
    );
};
