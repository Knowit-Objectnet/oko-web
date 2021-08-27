import * as React from 'react';
import { Button, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { colors } from '../../../theme/foundations/colors';
import Checkbox from '../../../assets/Checkbox.svg';
import { Totalvekt } from './components/Totalvekt';
import { ApiHenting, ApiHentingWrapper } from '../../../services/henting/HentingService';
import { useHentingById } from '../../../services/henting/useHentingById';
import { useState } from 'react';
import { VektForm } from './forms/VektForm';
import { BackButton } from '../../../components/buttons/BackButton';
import { HentingDetailsRoutingProps } from '../../henting/HentingDetails';

interface Props {
    hentingId: string;
    label: string;
}

export interface VektObjects {
    [key: string]: VektObject;
}

export interface VektObject {
    kategoriId: string;
    navn: string;
    value: number;
}

export const Vektregistrering: React.FC<Props> = ({ hentingId, label }) => {
    const { state: locationState } = useLocation<HentingDetailsRoutingProps>();
    const history = useHistory();

    const [vektObjects, setVekt] = useState<Record<string, number>>({});

    const hentingQuery = useHentingById(hentingId, { initialData: locationState?.henting });

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
                            width="100%"
                            maxWidth="2xl"
                            marginX="auto"
                            direction="column"
                            paddingTop={{ base: '10', tablet: '20' }}
                            alignItems="center"
                            spacing={14}
                        >
                            <Heading as="h1" fontSize="1.5rem" fontWeight={700}>
                                {label}
                            </Heading>
                            <Totalvekt vektObjects={vektObjects} />
                            <Text fontSize={{ base: 'md', desktop: 'xl ' }} fontWeight={normal} maxWidth={420}>
                                Byggevarer og materialer, sport- og fritidsutstyr, sykler, tekstiler og hvitevarer skal
                                registeres under egne vektkategorier. Alle andre varer skal registreres på
                                <span style={{ fontWeight: semibold }}> Andre ombruksvarer.</span>
                            </Text>
                            <VektForm henting={veiHenting} setVekt={setVekt} onSuccess={onSuccess} />
                        </VStack>

                        <Flex
                            alignSelf="stretch"
                            alignItems={{ base: 'center', handheld: 'flex-start' }}
                            justifyContent={locationState?.showBackButton ? 'space-between' : 'flex-end'}
                            flexDir={{ base: 'column-reverse', handheld: 'row' }}
                        >
                            <BackButton visible={locationState?.showBackButton} />
                            <HStack spacing={6}>
                                {/* //TODO: DENNE KNAPPEN ER DEAKTIVERT INNTILL VI VET HVA DEN SKAL GJØRE
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
                                 */}
                                <Button
                                    type="submit"
                                    form="vekt-form"
                                    variant="outline"
                                    rightIcon={<Icon as={Checkbox} boxSize="1rem" />}
                                    backgroundColor={colors.DarkBlue}
                                    textColor={colors.White}
                                    paddingX={{ base: 2, tablet: 8 }}
                                    paddingY={{ base: 1, tablet: 6 }}
                                    marginBottom={{ base: '4', handheld: '0' }}
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
