import * as React from 'react';
import { useState } from 'react';
import { useCalendarState } from '../CalendarProvider';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { CalendarFilterFn } from '../hooks/useCalendarFilters';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';

interface Props {
    title: string;
    name: 'stasjonFilter' | 'partnerFilter';
    data: Array<ApiPartner> | Array<ApiStasjon> | undefined;
    isLoading?: boolean;
    isError?: boolean;
    filterFn: (aktorIds: Array<string>) => CalendarFilterFn;
}

export const CalendarFilterSelect: React.FC<Props> = ({ title, name, data, isLoading, isError, filterFn }) => {
    const { setFilter, clearFilter } = useCalendarState();
    const [selectedAktorIds, setSelectedAktorIds] = useState<Array<string>>([]);

    const handleSelectionChange = (checkboxValues: Array<string>) => {
        setSelectedAktorIds(checkboxValues);

        if (checkboxValues.length === 0) {
            clearFilter(name);
        } else {
            setFilter(name, filterFn(checkboxValues));
        }
    };

    const handleSelectAlleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.currentTarget.checked) {
            handleSelectionChange([]);
        }
    };

    const getCheckboxes = () => {
        if (isLoading) {
            return <ListSkeleton />;
        }
        if (isError) {
            return <Text>Klarte ikke å hente</Text>;
        }
        if (data) {
            return (
                <>
                    <CheckboxGroup onChange={handleSelectionChange} value={selectedAktorIds}>
                        {data.map((aktor) => (
                            <Checkbox key={aktor.id} name={name} value={aktor.id} label={aktor.navn} />
                        ))}
                    </CheckboxGroup>
                    <Checkbox
                        name={name}
                        value="-1"
                        label="Alle"
                        isChecked={selectedAktorIds.length === 0}
                        onChange={handleSelectAlleChange}
                    />
                </>
            );
        }
    };

    return (
        <Flex as="form" flexDirection="column" justifyContent="center">
            <Flex as="fieldset" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <Text as="legend">{title}</Text>
                {getCheckboxes()}
            </Flex>
        </Flex>
    );
};
