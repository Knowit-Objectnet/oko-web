import * as React from 'react';
import { useState } from 'react';
import { Icon, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../auth/useAuth';
import { CalendarStasjonFilter } from './CalendarStasjonFilter';
import { CalendarPartnerFilter } from './CalendarPartnerFilter';
import Filter from '../../../assets/Filter.svg';
import { CalendarDrawerWrapper } from './CalendarDrawerWrapper';

export const CalendarFilters: React.FC = () => {
    const { user } = useAuth();

    // We have to store this state here, so that it is preserved across conditional renders of the filter components
    const [selectedStasjonIds, setSelectedStasjonIds] = useState<Array<string>>([]);
    const [selectedPartnerIds, setSelectedPartnerIds] = useState<Array<string>>([]);

    const getFilterCount = () => {
        const filterCount = [selectedStasjonIds, selectedPartnerIds].reduce(
            (result: number, currentFilter) => result + currentFilter.length,
            0,
        );
        return filterCount > 0 ? ` (${filterCount} aktive)` : '';
    };

    return (
        <CalendarDrawerWrapper
            triggerLabel={`Filtrer${getFilterCount()}`}
            triggerIcon={<Icon as={Filter} />}
            footerCloseButtonLabel="Sett filtre"
        >
            {/* TODO: make filters container on next line scroll if it overflows the full window height */}
            <VStack spacing="6" width="full">
                {user.isStasjon ? null : (
                    <CalendarStasjonFilter
                        selectedStasjonIds={selectedStasjonIds}
                        setSelectedStasjonIds={setSelectedStasjonIds}
                    />
                )}
                {user.isPartner ? null : (
                    <CalendarPartnerFilter
                        selectedPartnerIds={selectedPartnerIds}
                        setSelectedPartnerIds={setSelectedPartnerIds}
                    />
                )}
            </VStack>
        </CalendarDrawerWrapper>
    );
};
