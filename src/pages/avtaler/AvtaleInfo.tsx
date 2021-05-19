import { Box, Flex } from '@chakra-ui/layout';
import { AccordionButton, AccordionPanel, Button, ButtonGroup, Heading, Icon, Text } from '@chakra-ui/react';
import Pencil from '../../assets/Pencil.svg';
import Plus from '../../assets/Plus.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import React from 'react';
import { ApiAvtale } from '../../services-new/AvtaleService';
import { isFuture, isPast, isWithinInterval, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { HenteplanTable } from './HenteplanTable';
import { formatDate } from '../../utils/formatDateTime';

interface Props {
    avtale: ApiAvtale;
    isExpanded: boolean;
}

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

export const AvtaleInfo: React.FC<Props> = ({ avtale, isExpanded }) => (
    <Flex direction="column" width="100%" border="4px solid" borderColor="gray.200" padding={5}>
        <Flex justifyContent="space-between" width="100%">
            <Heading as="h3">
                <AccordionButton
                    fontSize="xl"
                    fontWeight="medium"
                    padding={0}
                    _hover={{ background: 'none', textDecoration: 'underline' }}
                >
                    <Box marginRight={1}>
                        <motion.div
                            style={{ transformOrigin: 'center' }}
                            animate={isExpanded ? { rotate: '90deg' } : { rotate: '0deg' }}
                        >
                            <Icon as={ArrowRight} transform="translate(-2px, -2px)" />
                        </motion.div>
                    </Box>
                    {getAvtaleTitle(avtale)}
                </AccordionButton>
            </Heading>
            <ButtonGroup spacing={2} visibility={isExpanded ? 'visible' : 'hidden'}>
                <Button
                    size="sm"
                    leftIcon={<Icon as={Pencil} />}
                    onClick={() => {
                        console.log(`Rediger avtale med id ${avtale.id}`);
                    }}
                >
                    Rediger avtale
                </Button>
            </ButtonGroup>
        </Flex>
        <Text>
            Varighet: <time>{formatDate(avtale.startDato)}</time> til <time>{formatDate(avtale.sluttDato)}</time>
        </Text>
        <Text>Type: {avtale.type}</Text>
        <AccordionPanel padding={0}>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                borderTop="2px solid"
                borderColor="gray.200"
                marginTop={4}
                paddingTop={3}
            >
                <Heading as="h4" fontSize="lg" fontWeight="medium">
                    {avtale.henteplaner.length > 0 ? 'Henteplaner' : 'Ingen registrerte henteplaner'}
                </Heading>
                <Button
                    size="sm"
                    leftIcon={<Icon as={Plus} />}
                    onClick={() => {
                        console.log('Legg til ny henteplan');
                    }}
                >
                    Legg til henteplan
                </Button>
            </Flex>
            {avtale.henteplaner.length > 0 ? <HenteplanTable henteplaner={avtale.henteplaner} /> : null}
        </AccordionPanel>
    </Flex>
);
