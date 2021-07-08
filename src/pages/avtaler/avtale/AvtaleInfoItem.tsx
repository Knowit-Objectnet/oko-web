import { Flex } from '@chakra-ui/layout';
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
            <Flex direction="column" width="full" backgroundColor="gray.100" padding="5">
                <Flex width="full" justifyContent="space-between">
                    <Heading fontSize="xl" as="h3" fontWeight="medium">
                        <HStack>
                            <Text marginRight="2">{getAvtaleTitle(avtale)}</Text>
                            <Text fontSize="sm" fontWeight="normal">
                                {AVTALE_TYPE[avtale.type]}, fra <time>{formatDate(parseISO(avtale.startDato))}</time>{' '}
                                til <time>{formatDate(parseISO(avtale.sluttDato))}</time>
                            </Text>
                        </HStack>
                    </Heading>

                    {user.isAdmin ? (
                        <ButtonGroup spacing="3" size="xs">
                            <EditAvtaleButton backgroundColor="white" avtale={avtale} />
                            <DeleteAvtaleButton backgroundColor="white" avtale={avtale} />
                        </ButtonGroup>
                    ) : null}
                </Flex>

                <Henteplaner avtale={avtale} partner={partner} />
            </Flex>
        );
    } else {
        return user.isPartner ? null : (
            <AccordionItem id={avtale.id}>
                {({ isExpanded }) => (
                    <Flex direction="column" width="full" backgroundColor="gray.100" padding="5">
                        <Flex justifyContent="space-between" justifyItems="baseline" width="full">
                            <Heading as="h3" flex="1">
                                <HStack justifyContent="flex-start">
                                    <AccordionButton
                                        width="fit-content"
                                        fontSize="xl"
                                        fontWeight="medium"
                                        padding="0"
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
                                    <Text fontSize="sm" fontWeight="normal">
                                        {AVTALE_TYPE[avtale.type]}, fra{' '}
                                        <time>{formatDate(parseISO(avtale.startDato))}</time> til{' '}
                                        <time>{formatDate(parseISO(avtale.sluttDato))}</time>
                                    </Text>
                                </HStack>
                            </Heading>

                            <Fade in={isExpanded} unmountOnExit>
                                {user.isAdmin ? (
                                    <ButtonGroup spacing="3" size="sm">
                                        <EditAvtaleButton backgroundColor="white" avtale={avtale} />
                                        <DeleteAvtaleButton backgroundColor="white" avtale={avtale} />
                                    </ButtonGroup>
                                ) : null}
                            </Fade>
                        </Flex>

                        <AccordionPanel padding="0">
                            <Henteplaner avtale={avtale} partner={partner} />
                        </AccordionPanel>
                    </Flex>
                )}
            </AccordionItem>
        );
    }
};
