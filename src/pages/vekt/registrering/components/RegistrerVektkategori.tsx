import * as React from 'react';
import { Heading, VStack, HStack, Flex, Text } from '@chakra-ui/react';
import { Kategorifelt } from './Kategorifelt';
import { useState } from 'react';
import { ApiPlanlagtHenting } from '../../../../services/henting/HentingService';
import { Unit, VektKategorier, Vektobjekt } from '../Vektregistrering';

interface Props {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    henting: ApiPlanlagtHenting;
}

export const RegistrerVektkategori: React.FC<Props> = ({ setState, henting }) => {
    const [vektkategorier, setVekt] = useState<VektKategorier>({});

    const onChanges = (vektobjekt: Vektobjekt) => {
        setVekt((prev) => {
            const kategorier = Object.assign({}, prev);
            kategorier[vektobjekt.id] = vektobjekt;
            console.log(kategorier);
            return kategorier;
        });
    };

    const totalvekt = () => {
        let total = 0;
        for (const key in vektkategorier) {
            const vektobjekt: Vektobjekt = vektkategorier[key];
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
        return total;
    };

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
                <VStack spacing={10}>
                    <Heading as="h1" fontSize="1.5rem" fontWeight={700}>
                        Registrer vekt
                    </Heading>

                    <HStack spacing={10}>
                        <Flex direction="column" alignItems="center">
                            <Heading as="h2" fontSize="1.5rem" fontWeight={400} marginBottom={2}>
                                Totalvekt
                            </Heading>
                            <Heading as="h2" fontSize="1.5rem" fontWeight={700} marginTop={2}>
                                {totalvekt()} kg
                            </Heading>
                        </Flex>
                        <Text fontSize="0.75rem" fontWeight={400} width={320}>
                            Bygg, sport, sykler, tekstiler og hvitevarer er såkalte vektkategorier hos oss, og er kun de
                            du kan registrere vekt på. Andre kategorier går under
                            <span style={{ fontWeight: 500 }}> Andre ombruksvarer</span>
                        </Text>
                    </HStack>
                    <Flex direction="column" alignItems="flex-start" aria-label="Vektkategorier">
                        {henting.kategorier.map((kategori) => {
                            if (kategori.kategori.vektkategori)
                                return (
                                    <Kategorifelt
                                        key={kategori.kategori.id}
                                        id={kategori.kategori.id}
                                        name={kategori.kategori.navn}
                                        vektobjekt={
                                            vektkategorier[kategori.kategori.id] || {
                                                id: kategori.kategori.id,
                                                navn: kategori.kategori.navn,
                                                unit: Unit.KG,
                                                value: 0,
                                            }
                                        }
                                        onChange={onChanges}
                                    />
                                );
                        })}
                        {henting.kategorier.some((kategori) => !kategori.kategori.vektkategori) ? (
                            <Kategorifelt
                                id="Andre"
                                name="Andre ombruksvarer"
                                onChange={onChanges}
                                vektobjekt={
                                    vektkategorier['Andre'] || {
                                        id: 'Andre',
                                        navn: 'Andre ombruksvarer',
                                        unit: Unit.KG,
                                        value: 0,
                                    }
                                }
                            />
                        ) : null}
                    </Flex>
                </VStack>
            </Flex>
        </>
    );
};
