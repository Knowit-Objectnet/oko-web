import * as React from 'react';
import { useState } from 'react';
import { useCalendarState } from '../CalendarProvider';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { CalendarFilterFn } from '../hooks/useCalendarFilters';

interface Props {
    title: string;
    name: 'stasjonFilter' | 'partnerFilter';
    data: ApiPartner[] | ApiStasjon[] | undefined;
    filterFn: (aktorIds: Array<string>) => CalendarFilterFn;
}

export const CalendarFilterSelect: React.FC<Props> = ({ title, name, data, filterFn }) => {
    const { setFilter, clearFilter } = useCalendarState();
    const [aktorIds, setAktorIds] = useState<Array<string>>([]);

    const handleOptionChange = (checkboxValues: Array<string>) => {
        setAktorIds(checkboxValues);

        if (checkboxValues.length === 0) {
            clearFilter(name);
        } else {
            setFilter(name, filterFn(checkboxValues));
        }
    };

    const handleAlleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.currentTarget.checked) {
            handleOptionChange([]);
        }
    };

    return (
        <Flex as="form" flexDirection="column" justifyContent="center">
            <Flex as="fieldset" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <Text as="legend">{title}</Text>
                <CheckboxGroup onChange={handleOptionChange} value={aktorIds}>
                    {data?.map((aktor) => (
                        <Checkbox key={aktor.id} name={name} value={aktor.id} label={aktor.navn} />
                    ))}
                </CheckboxGroup>
                <Checkbox
                    name={name}
                    value="-1"
                    label="Alle"
                    isChecked={aktorIds.length === 0}
                    onChange={handleAlleChange}
                />
            </Flex>
        </Flex>
    );
};
