import { Box, Flex } from '@chakra-ui/layout';
import {
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    ButtonGroup,
    Fade,
    Heading,
    Icon,
    HStack,
    Text,
    VStack,
    Stack,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import ArrowRight from '../../../assets/ArrowRight.svg';
import * as React from 'react';
import { ApiAvtale, AvtaleType } from '../../../services/avtale/AvtaleService';
import { isFuture, isPast, isWithinInterval, parseISO } from 'date-fns';
import { formatDate } from '../../../utils/formatDateTime';
import { Henteplaner } from '../henteplan/Henteplaner';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { EditAvtaleButton } from './EditAvtaleButton';
import { DeleteAvtaleButton } from './DeleteAvtaleButton';
import { useAuth } from '../../../auth/useAuth';

export const AVTALE_TYPE: Record<AvtaleType, string> = {
    ANNEN: 'Annen avtale',
    FAST: 'Fast avtale',
    INTERNTRANSPORT: 'Interntransport',
    OMBRUKSARRANGEMENT: 'Ombruksarrangement',
};

export const getAvtaleTitle = (avtale: ApiAvtale): string => {
    if (
        isWithinInterval(new Date(), {
            start: parseISO(avtale.startDato),
            end: parseISO(avtale.sluttDato),
        })
    ) {
        return 'Aktiv avtale';
    } else if (isPast(parseISO(avtale.sluttDato))) {
        return 'Tidligere avtale';
    } else if (isFuture(parseISO(avtale.startDato))) {
        return 'Kommende avtale';
    } else {
        return 'Avtale med udefinert tidsrom';
    }
};

interface Props {
    avtale: ApiAvtale;
    partner: ApiPartner;
}

export const AvtaleInfoItem: React.FC<Props> = ({ avtale, partner }) => {
    const { user } = useAuth();
    if (getAvtaleTitle(avtale) == 'Aktiv avtale') {
        return (
            <Grid
                templateColumns={{ base: 'auto', tablet: 'auto 64' }}
                templateAreas={{
                    base: "'title' 'timeframe' 'saksnummer' 'buttons' 'henteplan'",
                    tablet: "'title buttons' 'timeframe timeframe' 'saksnummer saksnummer' 'henteplan henteplan'",
                }}
                templateRows="auto"
                backgroundColor="gray.100"
                padding="5"
                rowGap="1"
            >
                <Heading fontSize="xl" as="h3" fontWeight="normal" paddingY="2" gridArea="title">
                    {getAvtaleTitle(avtale)}
                </Heading>

                <Text fontSize="sm" fontWeight="normal" gridArea="timeframe">
                    {AVTALE_TYPE[avtale.type]}, fra <time>{formatDate(parseISO(avtale.startDato))}</time> til{' '}
                    <time>{formatDate(parseISO(avtale.sluttDato))}</time>
                </Text>

                {user.isAdmin ? (
                    <ButtonGroup
                        spacing="3"
                        size="xs"
                        gridArea="buttons"
                        display="flex"
                        justifyContent={{ base: 'flex-start', tablet: 'flex-end' }}
                    >
                        <EditAvtaleButton backgroundColor="white" avtale={avtale} />
                        <DeleteAvtaleButton backgroundColor="white" avtale={avtale} />
                    </ButtonGroup>
                ) : null}

                {user.isAdmin || user.isStasjon ? (
                    <HStack gridArea="saksnummer">
                        <Text fontSize="sm" fontWeight="normal">
                            Saksnummer i arkivsystem
                        </Text>
                        {avtale.saksnummer === null ? (
                            <Text fontSize="sm" fontStyle="italic">
                                Ingen referanse til avtaledokument
                            </Text>
                        ) : (
                            <Text fontSize="sm">{avtale.saksnummer}</Text>
                        )}
                    </HStack>
                ) : null}

                <Box width="full" gridArea="henteplan">
                    <Henteplaner avtale={avtale} partner={partner} />
                </Box>
            </Grid>
        );
    } else {
        return user.isPartner ? null : (
            <AccordionItem id={avtale.id}>
                {({ isExpanded }) => (
                    <Grid
                        templateColumns={{ base: 'auto', tablet: 'auto 64' }}
                        templateAreas={{
                            base: "'title' 'timeframe' 'buttons' 'henteplan'",
                            tablet: "'title buttons' 'timeframe timeframe' 'henteplan henteplan'",
                        }}
                        templateRows="auto"
                        backgroundColor="gray.100"
                        padding="5"
                    >
                        <AccordionButton
                            width="fit-content"
                            fontSize="xl"
                            fontWeight="medium"
                            padding="0"
                            gridArea="title"
                            _hover={{ background: 'none', textDecoration: 'underline' }}
                        >
                            <Icon
                                as={ArrowRight}
                                transform={`translate(-2px, -2px) rotate(${isExpanded ? '90deg' : '0deg'})`}
                                transformOrigin="center"
                                transition="transform 200ms ease-in-out"
                                marginRight="1"
                            />
                            <Text marginRight="2">{getAvtaleTitle(avtale)}</Text>
                        </AccordionButton>

                        <Box gridArea="buttons">
                            <Fade in={isExpanded} unmountOnExit>
                                {user.isAdmin ? (
                                    <ButtonGroup
                                        spacing="3"
                                        size="xs"
                                        display="flex"
                                        justifyContent={{ base: 'flex-start', tablet: 'flex-end' }}
                                        marginTop={{ base: '2', tablet: '0' }}
                                    >
                                        <EditAvtaleButton backgroundColor="white" avtale={avtale} />
                                        <DeleteAvtaleButton backgroundColor="white" avtale={avtale} />
                                    </ButtonGroup>
                                ) : null}
                            </Fade>
                        </Box>

                        <Box gridArea="timeframe">
                            <Fade in={isExpanded} unmountOnExit>
                                <Text fontSize="sm" fontWeight="normal" marginTop="4">
                                    {AVTALE_TYPE[avtale.type]}, fra
                                    <time>{formatDate(parseISO(avtale.startDato))}</time> til
                                    <time>{formatDate(parseISO(avtale.sluttDato))}</time>
                                </Text>
                            </Fade>
                        </Box>

                        <Box gridArea="henteplan">
                            <AccordionPanel padding="0">
                                <Henteplaner avtale={avtale} partner={partner} />
                            </AccordionPanel>
                        </Box>
                    </Grid>
                )}
            </AccordionItem>
        );
    }
};
