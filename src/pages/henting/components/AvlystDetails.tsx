import * as React from 'react';
import { Flex, Heading, HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import Warning from '../../../assets/Warning.svg';
import { useAarsakById } from '../../../services/aarsak/useAarsakById';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { Box } from '@chakra-ui/layout';

interface Props {
    henting: ApiHentingWrapper;
}

export const AvlystDetails: React.FC<Props & StackProps> = ({ henting, ...props }) => {
    const { data: aarsak } = useAarsakById(henting.planlagtHenting?.aarsakId || '');
    let avlystAv = '';
    if (henting.planlagtHenting?.avlystAv == '00000000-0000-0000-0000-000000000000') {
        avlystAv = 'Admin';
    } else if (henting.planlagtHenting?.avlystAv == henting.stasjonId) {
        avlystAv = henting.stasjonNavn;
    } else if (henting.aktorNavn !== undefined && henting.planlagtHenting?.avlystAv == henting.aktorId) {
        avlystAv = henting.aktorNavn;
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
