import * as React from 'react';
import { Button, Flex, Heading, HStack, Icon, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { colors } from '../../../theme/foundations/colors';
import Checkbox from '../../../assets/Checkbox.svg';
import Cross from '../../../assets/Cross.svg';
import { Totalvekt } from './components/Totalvekt';
import { ApiHenting, ApiHentingWrapper } from '../../../services/henting/HentingService';
import { useHentingById } from '../../../services/henting/useHentingById';
import { useState } from 'react';
import { VektForm } from './forms/VektForm';

interface Props {
    hentingId: string;
}

export interface Vektobjekter {
    [key: string]: Vektobjekt;
}

export interface Vektobjekt {
    id: string;
    navn: string;
    unit: Unit;
    value: number;
}

export enum Unit {
    'KG',
    'TONN',
    'GRAM',
}

export const Vektregistrering: React.FC<Props> = ({ hentingId }) => {
    const { state: locationState } = useLocation<{ henting?: ApiHentingWrapper; prevPath?: string }>();
    const history = useHistory();

    const [vektobjekter, setVekt] = useState<Vektobjekter>({});

    const hentingQuery = useHentingById(hentingId, { initialData: locationState?.henting });

    const getBackButton = () => {
        if (locationState?.prevPath) {
            return (
                <Button as={Link} to={locationState.prevPath} variant="outline">
                    Tilbake
                </Button>
            );
        }
    };

    const onSuccess = () => {
        history.push(`/henting/${hentingId}`);
    };

    // TODO: create better UI for loading and error states
    return hentingQuery.dispatch<React.ReactElement | null>(
        () => null,
        () => <>Vennligst vent...</>,
        () => <>Klarte dessverre ikke å finne informasjon for denne hentingen</>,
        (henting: ApiHentingWrapper) => {
            const veiHenting: ApiHenting | undefined = henting.planlagtHenting || henting.ekstraHenting;
            if (!veiHenting) return <>Klarte dessverre ikke å finne informasjon for denne hentingen</>;
            else
                return (
                    <>
                        <VStack
                            width="2xl"
                            maxWidth="2xl"
                            marginX="auto"
                            direction="column"
                            paddingTop={{ base: '10', tablet: '20' }}
                            alignItems="center"
                            spacing={14}
                        >
                            <Heading as="h1" fontSize="1.5rem" fontWeight={700}>
                                Registrer vekt
                            </Heading>
                            <Totalvekt vektobjekter={vektobjekter} />
                            <Text fontSize="0.75rem" fontWeight={400} maxWidth={420}>
                                Bygg, sport, sykler, tekstiler og hvitevarer er såkalte vektkategorier hos oss, og er
                                kun de du kan registrere vekt på. Andre kategorier går under
                                <span style={{ fontWeight: 500 }}> Andre ombruksvarer</span>
                            </Text>
                            <VektForm
                                henting={veiHenting}
                                setVekt={setVekt}
                                vektobjekter={vektobjekter}
                                onSuccess={onSuccess}
                            />
                        </VStack>

                        <Flex
                            alignSelf="stretch"
                            alignItems="flex-start"
                            justifyContent={getBackButton() ? 'space-between' : 'flex-end'}
                        >
                            {getBackButton()}
                            <HStack spacing={6}>
                                <Button
                                    paddingX={8}
                                    paddingY={6}
                                    rightIcon={<Icon as={Cross} boxSize="0.7rem" />}
                                    variant="outline"
                                    fontSize="1rem"
                                    fontWeight={400}
                                >
                                    Jeg hentet ikke varene
                                </Button>
                                <Button
                                    type="submit"
                                    form="vekt-form"
                                    variant="outline"
                                    rightIcon={<Icon as={Checkbox} boxSize="1rem" />}
                                    backgroundColor={colors.DarkBlue}
                                    textColor={colors.White}
                                    paddingX={8}
                                    paddingY={6}
                                >
                                    Lagre vekt og avslutt
                                </Button>
                            </HStack>
                        </Flex>
                    </>
                );
        },
    );
};
