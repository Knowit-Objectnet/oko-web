import * as React from 'react';
import { Heading, HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import Warning from '../../../assets/Warning.svg';
import { useAarsakById } from '../../../services/aarsak/useAarsakById';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

interface Props {
    henting: ApiHentingWrapper;
}

export const AvlystDetails: React.FC<Props & StackProps> = ({ henting, ...props }) => {
    const { data: aarsak } = useAarsakById(henting.planlagtHenting?.aarsakId || '');

    return (
        <>
            {henting.planlagtHenting?.avlyst && henting.planlagtHenting?.avlystAv ? (
                <HStack
                    spacing={2}
                    padding="0.5rem"
                    paddingLeft="1rem"
                    backgroundColor="error"
                    {...props}
                    align="center"
                >
                    <Icon as={Warning} boxSize="2rem" />
                    <HStack spacing={10} alignItems="baseline">
                        <Heading fontSize="lg">Henting avlyst av {henting.aktorNavn || 'Admin'}</Heading>
                        <Text fontSize="sm" marginTop={4}>
                            {aarsak?.beskrivelse || null}
                        </Text>
                    </HStack>
                </HStack>
            ) : null}
        </>
    );
};
