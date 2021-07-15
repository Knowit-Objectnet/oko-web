import * as React from 'react';
import { Heading, VStack, Button, Icon, Flex } from '@chakra-ui/react';
import Pencil from '../../../../assets/Pencil.svg';
import Cross from '../../../../assets/CrossSmall.svg';
import { Registreringsfelt } from './Registreringfelt';
import { useState } from 'react';
import { Unit, Vektobjekt } from '../Vektregistrering';
import { ApiPlanlagtHenting } from '../../../../services/henting/PlanlagtHentingService';

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    henting: ApiPlanlagtHenting;
}

export const Totalvekt: React.FC<Props> = ({ setState, henting }) => {
    const [vektobjekt, setVekt] = useState<Vektobjekt>({ id: '', navn: 'Totalvekt', unit: Unit.KG, value: 0 });
    return (
        <>
            <Flex
                width="2xl"
                maxWidth="2xl"
                marginX="auto"
                direction="column"
                paddingTop={{ base: '10', tablet: '20' }}
                alignItems="center"
            >
                <VStack spacing={20}>
                    <Heading as="h1" fontSize="1.5rem" fontWeight={700}>
                        Registrer vekt
                    </Heading>

                    <Flex direction="column" alignItems="center">
                        <Heading as="h2" fontSize="1.5rem" fontWeight={400} marginBottom={4}>
                            Totalvekt
                        </Heading>
                        <Registreringsfelt vektobjekt={vektobjekt} setVekt={setVekt} />
                    </Flex>

                    <Flex alignItems="flex-start" direction="column">
                        <Button
                            justifyContent="space-evenly"
                            width="xs"
                            paddingY={8}
                            rightIcon={<Icon as={Pencil} boxSize="2rem" />}
                            variant="outline"
                            fontSize="1rem"
                            fontWeight={400}
                            onClick={() => {
                                setState(false);
                            }}
                            margin={1}
                        >
                            Registrer vekt på kategorier
                        </Button>
                        <Button
                            justifyContent="space-evenly"
                            width="xs"
                            paddingY={8}
                            rightIcon={<Icon as={Cross} boxSize="0.7rem" />}
                            variant="outline"
                            fontSize="1rem"
                            fontWeight={400}
                            margin={1}
                        >
                            Jeg hentet ikke varene
                        </Button>
                    </Flex>
                </VStack>
            </Flex>
        </>
    );
};
