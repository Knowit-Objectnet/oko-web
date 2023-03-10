import * as React from 'react';
import { ButtonGroup, Flex, HStack, Text } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { EditAarsakButton } from './EditAarsakButton';
import { DeleteAarsakButton } from './DeleteAarsakButton';
import { useAarsaker } from '../../services/aarsak/useAarsaker';

interface Props {
    isPartnerAarsaker: boolean;
}

export const AarsakList: React.FC<Props> = ({ isPartnerAarsaker }) => {
    const { data: aarsaker } = useAarsaker();
    const sortedAarsaker = aarsaker?.sort((aarsakA, aarsakB) => aarsakA.beskrivelse.localeCompare(aarsakB.beskrivelse));

    const sortedAarsakerByType = sortedAarsaker?.filter((aarsak) => {
        if (isPartnerAarsaker) {
            return aarsak.type == 'PARTNER' ? aarsak : null;
        } else {
            return aarsak.type == 'STASJON' ? aarsak : null;
        }
    });

    return (
        <List alignItems="flex-start" width={{ base: '50%', tablet: 'full', desktop: '80%' }}>
            {sortedAarsakerByType?.map((aarsak, valgNumber) => (
                <ListItem key={aarsak.id}>
                    <HStack justifyContent="space-between" marginBottom="1">
                        <Text fontSize="sm">Avlysningsårsak {valgNumber + 1} </Text>
                        <ButtonGroup>
                            <EditAarsakButton aarsak={aarsak} />
                            <DeleteAarsakButton aarsak={aarsak} />
                        </ButtonGroup>
                    </HStack>

                    <HStack
                        width="full"
                        border="2px solid"
                        spacing="300"
                        borderColor="gray.200"
                        marginBottom="8"
                        alignItems="flex-start"
                        padding="2"
                        key={aarsak.id}
                    >
                        <Flex fontSize="sm" flexGrow={1} direction="column" alignItems="flex-start">
                            <Text fontWeight="normal" fontSize="sm" aria-label="Årsak">
                                {aarsak.beskrivelse}
                            </Text>
                        </Flex>
                    </HStack>
                </ListItem>
            ))}
        </List>
    );
};
