import * as React from 'react';
import { Heading, HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import { useAktorById } from '../../../services/aktor/useAktorById';
import Warning from '../../../assets/Warning.svg';

interface Props {
    id: string;
    aarsak: string | null;
}

export const AvlystDetails: React.FC<Props & StackProps> = ({ id, aarsak, ...props }) => {
    const { data: aktor } = useAktorById(id);
    console.log(aktor);

    return (
        <HStack spacing={2} p="0.5rem" pl="1rem" backgroundColor="error" {...props} align="center">
            <Icon as={Warning} boxSize="2rem" />
            <HStack spacing={10} alignItems="baseline">
                <Heading fontSize="lg">Henting avlyst av {aktor?.navn || null}</Heading>
                <Text fontSize="sm" mt={4}>
                    {aarsak || null}
                </Text>
            </HStack>
        </HStack>
    );
};
