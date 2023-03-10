import * as React from 'react';
import { useCalendarState } from '../CalendarProvider';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { CheckboxGroup, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { CalendarFilterFn } from '../hooks/useCalendarFilters';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';
import { Box } from '@chakra-ui/layout';
import Filter from '../../../assets/Filter.svg';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';

interface Props {
    labels: {
        title: string;
        error: string;
    };
    name: string;
    data: ApiPartner[] | ApiStasjon[] | undefined;
    isLoading: boolean;
    isLoadingError: boolean;
    filterFnFactory: (aktorIds: Array<string>) => CalendarFilterFn;
    selectedAktorIds: Array<string>;
    setSelectedAktorIds: (aktorIds: Array<string>) => void;
}

export const CalendarFilterSelect: React.FC<Props> = ({
    labels,
    name,
    data,
    isLoading,
    isLoadingError,
    filterFnFactory,
    selectedAktorIds,
    setSelectedAktorIds,
}) => {
    const { setFilter, clearFilter } = useCalendarState();

    const handleSelectionChange = (checkboxValues: Array<string>) => {
        setSelectedAktorIds(checkboxValues);

        if (checkboxValues.length === 0) {
            clearFilter(name);
        } else {
            const filterFn = filterFnFactory(checkboxValues);
            setFilter(name, filterFn);
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
        if (isLoadingError) {
            return <Text>{labels.error}</Text>;
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
        <Box as="form" width="full">
            <VStack as="fieldset" alignItems="flex-start" width="full" spacing="0">
                <HStack paddingBottom="2" paddingLeft="1.5">
                    <Icon as={Filter} aria-hidden boxSize="1.2rem" />
                    <Text as="legend" fontWeight="medium" fontSize="lg">
                        {labels.title}
                    </Text>
                </HStack>
                {getCheckboxes()}
            </VStack>
        </Box>
    );
};
