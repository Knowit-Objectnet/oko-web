import * as React from 'react';
import { Heading, VStack, Flex } from '@chakra-ui/react';
import { Unit, Vektobjekter, Vektobjekt } from '../Vektregistrering';
import { ApiHenting } from '../../../../services/henting/HentingService';
import { Kategorifelt } from './Kategorifelt';

interface Props {
    henting: ApiHenting;
    vektobjekter: Vektobjekter;
    setVekt: React.Dispatch<React.SetStateAction<Vektobjekter>>;
}

export const RegistrerVektkategori: React.FC<Props> = ({ henting, vektobjekter, setVekt }) => {
    const onChanges = (vektobjekt: Vektobjekt) => {
        setVekt((prev) => {
            const kategorier = Object.assign({}, prev);
            kategorier[vektobjekt.id] = vektobjekt;
            console.log(kategorier);
            return kategorier;
        });
    };

    return (
        <>
            <VStack alignItems="center">
                <Heading as="h2" fontSize="1.5rem" fontWeight={400}>
                    Registrert på kategorier
                </Heading>
                <Flex direction="column" alignItems="flex-start" aria-label="Vektkategorier">
                    {henting.kategorier?.map((kategori) => {
                        if (kategori.kategori.vektkategori)
                            return (
                                <Kategorifelt
                                    key={kategori.kategori.id}
                                    id={kategori.kategori.id}
                                    vektobjekt={
                                        vektobjekter[kategori.kategori.id] || {
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
                    {henting.kategorier?.some((kategori) => !kategori.kategori.vektkategori) ? (
                        <Kategorifelt
                            //TODO: Create a protected id for "Andre ombruksvarer", should be used for everything else
                            id="0f3f3bdd-5733-45da-87ae-a9417596cb12"
                            onChange={onChanges}
                            vektobjekt={
                                vektobjekter['0f3f3bdd-5733-45da-87ae-a9417596cb12'] || {
                                    id: '0f3f3bdd-5733-45da-87ae-a9417596cb12',
                                    navn: 'Andre ombruksvarer',
                                    unit: Unit.KG,
                                    value: 0,
                                }
                            }
                        />
                    ) : null}
                </Flex>
                )
            </VStack>
        </>
    );
};
