import * as React from 'react';
import { CheckboxGroup, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import Filter from '../../../assets/Filter.svg';

interface Props {
    selectedAvtaler: Array<string>;
    setSelectedAvtaler: (partnerIds: Array<string>) => void;
}

export const PartnerFilterSelect: React.FC<Props> = ({ selectedAvtaler, setSelectedAvtaler }) => {
    const handleSelectionChange = (checkboxValues: Array<string>) => {
        setSelectedAvtaler(checkboxValues);
        console.log(checkboxValues);
    };

    return (
        <VStack marginBottom={{ base: '8' }}>
            <HStack width="100%">
                <Icon as={Filter} height="6" width="auto" />
                <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                    Filtrer på avtale
                </Heading>
            </HStack>

            <CheckboxGroup onChange={handleSelectionChange} value={selectedAvtaler}>
                <Checkbox name="aktivAvtale" value="aktiv" label="Aktiv avtale" />
                <Checkbox name="kommendeAvtale" value="kommende" label="Kommende avtale" />
                <Checkbox name="ingenAvtale" value="ingen" label="Ingen avtale" />
            </CheckboxGroup>
        </VStack>
    );
};
