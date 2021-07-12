import * as React from 'react';
import { Heading, HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import { useAktorById } from '../../../services/aktor/useAktorById';
import Warning from '../../../assets/Warning.svg';
import { useAarsakById } from '../../../services/aarsak/useAarsakById';

interface Props {
    id: string;
    aarsakId: string | null;
}

export const AvlystDetails: React.FC<Props & StackProps> = ({ id, aarsakId, ...props }) => {
    const { data: aktor } = useAktorById(id);
    const { data: aarsak } = useAarsakById(aarsakId || '');

    return (
        <HStack spacing={2} padding="0.5rem" paddingLeft="1rem" backgroundColor="error" {...props} align="center">
            <Icon as={Warning} boxSize="2rem" />
            <HStack spacing={10} alignItems="baseline">
                <Heading fontSize="lg">Henting avlyst av {aktor?.navn || 'Admin'}</Heading>
                <Text fontSize="sm" marginTop={4}>
                    {aarsak?.beskrivelse || null}
                </Text>
            </HStack>
        </HStack>
    );
};
