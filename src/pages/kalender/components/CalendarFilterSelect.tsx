import * as React from 'react';
import { useCalendarState } from '../CalendarProvider';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { CheckboxGroup, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { CalendarFilterFn } from '../hooks/useCalendarFilters';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';
import { UseQueryResult } from 'react-query';
import { Box } from '@chakra-ui/layout';
import Filter from '../../../assets/Filter.svg';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { useAuth } from '../../../auth/useAuth';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';

interface Props {
    labels: {
        title: string;
        error: string;
    };
    name: string;
    query: UseQueryResult<Array<ApiPartner> | Array<ApiStasjon>>;
    filterFnFactory: (aktorIds: Array<string>) => CalendarFilterFn;
    selectedAktorIds: Array<string>;
    setSelectedAktorIds: (aktorIds: Array<string>) => void;
}

export const CalendarFilterSelect: React.FC<Props> = ({
    labels,
    name,
    query,
    filterFnFactory,
    selectedAktorIds,
    setSelectedAktorIds,
}) => {
    const { setFilter, clearFilter } = useCalendarState();
    const user = useAuth();
    const today = new Date();
    const data: undefined | Array<ApiPartner> | Array<ApiStasjon> = query.data;
    const filteredPartnerData: ApiPartner[] = ((data as ApiPartner[]) || [])?.filter((partner: ApiPartner) =>
        partner?.avtaler?.some((avtale: ApiAvtale) => {
            if (new Date(avtale?.sluttDato) > today) {
                return avtale?.henteplaner?.some(
                    (henteplan: ApiHenteplan) => henteplan?.stasjonId == user.user.aktorId,
                );
            }
        }),
    );
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
        if (query.isLoading) {
            return <ListSkeleton />;
        }
        if (query.isLoadingError) {
            return <Text>{labels.error}</Text>;
        }
        if (query.data) {
            return (
                <>
                    <CheckboxGroup onChange={handleSelectionChange} value={selectedAktorIds}>
                        {filteredPartnerData?.map((aktor: ApiPartner) => (
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
