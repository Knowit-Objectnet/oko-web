import * as React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { Unit, Vektobjekter, Vektobjekt } from '../Vektregistrering';

interface Props {
    vektobjekter: Vektobjekter;
}

export const Totalvekt: React.FC<Props> = ({ vektobjekter }) => {
    const totalvekt = () => {
        let total = 0;
        for (const key in vektobjekter) {
            const vektobjekt: Vektobjekt = vektobjekter[key];
            const unit: Unit = vektobjekt.unit;
            if (!isNaN(vektobjekt.value)) {
                switch (unit) {
                    case Unit.KG:
                        total += vektobjekt.value;
                        break;
                    case Unit.TONN:
                        total += vektobjekt.value * 1000;
                        break;
                    default:
                        total += vektobjekt.value / 1000;
                }
            }
        }
        console.log('Total:', total);
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
