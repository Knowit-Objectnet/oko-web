import * as React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { Unit, VektObjects, VektObject } from '../Vektregistrering';

interface Props {
    vektObjects: VektObjects;
}

export const Totalvekt: React.FC<Props> = ({ vektObjects }) => {
    const totalvekt = () => {
        let total = 0;
        for (const key in vektObjects) {
            const vektObject: VektObject = vektObjects[key];
            const unit: Unit = vektObject.unit;
            if (!isNaN(vektObject.value)) {
                switch (unit) {
                    case Unit.KG:
                        total += vektObject.value;
                        break;
                    case Unit.TONN:
                        total += vektObject.value * 1000;
                        break;
                    default:
                        total += vektObject.value / 1000;
                }
            }
        }
        return total;
    };
    return (
        <>
            <Flex direction="column" alignItems="center">
                <Heading as="h2" fontSize="1.5rem" fontWeight={400} marginBottom={4}>
                    Totalvekt
                </Heading>
                <Heading as="h2" fontSize="1.5rem" fontWeight={700}>
                    {totalvekt() || 0} kg
                </Heading>
            </Flex>
        </>
    );
};
