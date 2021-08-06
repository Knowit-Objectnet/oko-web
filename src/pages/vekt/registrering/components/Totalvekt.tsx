import * as React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

interface Props {
    vektObjects: Record<string, number>;
}

export const Totalvekt: React.FC<Props> = ({ vektObjects }) => {
    const totalvekt = () => {
        let total = 0;
        for (const key in vektObjects) {
            const vektValue = vektObjects[key];
            if (!isNaN(vektValue)) {
                total += vektValue;
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
