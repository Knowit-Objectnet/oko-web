import { Flex } from '@chakra-ui/layout';
import {
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    ButtonGroup,
    Fade,
    Heading,
    Icon,
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
    return (
        <AccordionItem id={avtale.id}>
            {({ isExpanded }) => (
                <Flex direction="column" width="full" border="4px solid" borderColor="gray.200" padding="5">
                    <Flex justifyContent="space-between" width="full">
                        <Heading as="h3" flex="1">
                            <AccordionButton
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
                                {getAvtaleTitle(avtale)}
                            </AccordionButton>
                        </Heading>
                        <Fade in={isExpanded} unmountOnExit>
                            {user.isAdmin ? (
                                <ButtonGroup spacing="4" size="sm">
                                    <EditAvtaleButton size="sm" avtale={avtale} />
                                    <DeleteAvtaleButton avtale={avtale} />
                                </ButtonGroup>
                            ) : null}
                        </Fade>
                    </Flex>
                    <Text>
                        {AVTALE_TYPE[avtale.type]}, fra <time>{formatDate(parseISO(avtale.startDato))}</time> til{' '}
                        <time>{formatDate(parseISO(avtale.sluttDato))}</time>
                    </Text>
                    <AccordionPanel padding="0">
                        <Henteplaner avtale={avtale} partner={partner} />
                    </AccordionPanel>
                </Flex>
            )}
        </AccordionItem>
    );
};
