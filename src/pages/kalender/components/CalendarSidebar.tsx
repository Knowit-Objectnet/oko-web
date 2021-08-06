import * as React from 'react';
import { useAuth } from '../../../auth/useAuth';
import { useCalendarState } from '../CalendarProvider';
import { VStack } from '@chakra-ui/react';
import { CalendarDatePicker } from './CalendarDatePicker';
import { CalendarStasjonFilter } from './CalendarStasjonFilter';
import { CalendarPartnerFilter } from './CalendarPartnerFilter';
import { useState } from 'react';

export const CalendarSidebar: React.FC = () => {
    const { user } = useAuth();
    const { shouldHideSidebar } = useCalendarState();

    // We have to store this state here, so that it is preserved across conditional renders of the filter components
    const [selectedStasjonIds, setSelectedStasjonIds] = useState<Array<string>>([]);
    const [selectedPartnerIds, setSelectedPartnerIds] = useState<Array<string>>([]);

    return !shouldHideSidebar ? (
        <VStack alignItems="flex-start" spacing="2">
            <CalendarDatePicker />
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
        </VStack>
    ) : null;
};
