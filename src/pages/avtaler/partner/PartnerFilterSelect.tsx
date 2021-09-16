import * as React from 'react';
import { CheckboxGroup, Heading, Icon, Input } from '@chakra-ui/react';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import Filter from '../../../assets/Filter.svg';
import { Flex } from '@chakra-ui/layout';
import { ChangeEvent } from 'react';

interface Props {
    setInputFieldValue: (input: string) => void;
    selectedAvtaler: Array<string>;
    setSelectedAvtaler: (partnerIds: Array<string>) => void;
}

export const PartnerFilterSelect: React.FC<Props> = ({ setInputFieldValue, selectedAvtaler, setSelectedAvtaler }) => {
    const handleSelectionChange = (checkboxValues: Array<string>) => {
        setSelectedAvtaler(checkboxValues);
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputFieldValue(inputValue);
    };

    return (
        <Flex direction="column" marginBottom={{ base: '8' }}>
            <Input name="sok" placeholder="Søk" onChange={handleInputChange} />

            <Flex direction="row" marginTop="5">
                <Icon as={Filter} height="8" width="auto" />
                <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                    Filtrer på avtale
                </Heading>
            </Flex>

            <CheckboxGroup onChange={handleSelectionChange} value={selectedAvtaler}>
                <Checkbox marginTop="3" name="aktivAvtale" value="aktiv" label="Aktiv avtale" />
                <Checkbox marginTop="3" name="kommendeAvtale" value="kommende" label="Kommende avtale" />
                <Checkbox marginTop="3" name="ingenAvtale" value="ingen" label="Ingen avtale" />
            </CheckboxGroup>
        </Flex>
    );
};
