import { Flex } from '@chakra-ui/layout';
import { AccordionButton, AccordionItem, AccordionPanel, Heading, Icon, Text } from '@chakra-ui/react';
import ArrowRight from '../../assets/ArrowRight.svg';
import * as React from 'react';
import { ApiAvtale } from '../../services-new/AvtaleService';
import { isFuture, isPast, isWithinInterval, parseISO } from 'date-fns';
import { formatDate } from '../../utils/formatDateTime';
import { Henteplaner } from './Henteplaner';
import { EditButton } from '../../components/buttons/EditButton';
import { AvtaleType } from '../../types';

const AVTALE_TYPE: Record<AvtaleType, string> = {
    ANNEN: 'Annen avtale',
    FAST: 'Fast avtale',
    INTERNTRANSPORT: 'Interntransport',
    OMBRUKSARRANGEMENT: 'Ombruksarrangement',
};

const getAvtaleTitle = (avtale: ApiAvtale) => {
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
}

export const AvtaleInfoItem: React.FC<Props> = ({ avtale }) => (
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
                    <EditButton
                        label="Rediger avtale"
                        onClick={() => {
                            console.log(`Rediger avtale med id ${avtale.id}`);
                        }}
                        size="sm"
                        visibility={isExpanded ? 'visible' : 'hidden'}
                        opacity={isExpanded ? '1' : '0'}
                        transition="opacity 200ms ease-out"
                    />
                </Flex>
                <Text>
                    {AVTALE_TYPE[avtale.type]}, fra <time>{formatDate(avtale.startDato)}</time> til{' '}
                    <time>{formatDate(avtale.sluttDato)}</time>
                </Text>
                <AccordionPanel padding="0">
                    <Henteplaner henteplaner={avtale.henteplaner} />
                </AccordionPanel>
            </Flex>
        )}
    </AccordionItem>
);
