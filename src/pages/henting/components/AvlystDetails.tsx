import * as React from 'react';
import { Flex, Heading, HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import Warning from '../../../assets/Warning.svg';
import { useAarsakById } from '../../../services/aarsak/useAarsakById';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { Box } from '@chakra-ui/layout';
import { useAuth } from '../../../auth/useAuth';
import { findOneAktor } from '../../../services/aktor/AktorService';
import { useAktorById } from '../../../services/aktor/useAktorById';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';

interface Props {
    henting: ApiHentingWrapper;
}

export const AvlystDetails: React.FC<Props & StackProps> = ({ henting, ...props }) => {
    const { data: aarsak } = useAarsakById(henting.planlagtHenting?.aarsakId || '');
    const { data: aktor } = useAktorById(henting.planlagtHenting?.avlystAv || '');
    const { data: stasjon } = useStasjonById(henting.planlagtHenting?.avlystAv || '');
    let avlystAv = 'Admin';
    if (aktor) {
        avlystAv = aktor.navn;
    }
    if (stasjon) {
        avlystAv = stasjon.navn;
    }
    return (
        <Box>
            {henting.planlagtHenting?.avlyst && henting.planlagtHenting?.avlystAv ? (
                <HStack
                    spacing={2}
                    padding="0.5rem"
                    paddingLeft="1rem"
                    backgroundColor="error"
                    {...props}
                    justify="center"
                >
                    <Icon as={Warning} boxSize="2rem" />
                    <Flex spacing={10} alignItems="baseline" direction="column">
                        <Heading fontSize="lg">Henting avlyst av {avlystAv}</Heading>
                        <Text fontSize="sm" marginTop={1}>
                            {aarsak?.beskrivelse || null}
                        </Text>
                    </Flex>
                </HStack>
            ) : null}
        </Box>
    );
};
