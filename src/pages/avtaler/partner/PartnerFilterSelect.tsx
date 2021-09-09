import * as React from 'react';
import { CheckboxGroup, Heading, VStack } from '@chakra-ui/react';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { useState } from 'react';

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
        <VStack>
            <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                Filter
            </Heading>
            <CheckboxGroup onChange={handleSelectionChange} value={selectedAvtaler}>
                <Checkbox name="aktivAvtale" value="aktiv" label="Aktiv avtale" />
                <Checkbox name="kommendeAvtale" value="kommende" label="Kommende avtale" />
                <Checkbox name="ingenAvtale" value="ingen" label="Ingen avtale" />
            </CheckboxGroup>
        </VStack>
    );
};
