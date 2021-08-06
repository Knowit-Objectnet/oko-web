import * as React from 'react';
import { useAuth } from '../../../auth/useAuth';
import { useCalendarState } from '../CalendarProvider';
import { VStack } from '@chakra-ui/react';
import { CalendarDatePicker } from './CalendarDatePicker';
import { CalendarStasjonFilter } from './CalendarStasjonFilter';
import { CalendarPartnerFilter } from './CalendarPartnerFilter';

export const CalendarSidebar: React.FC = () => {
    const { user } = useAuth();
    const { shouldHideSidebar } = useCalendarState();

    return !shouldHideSidebar ? (
        <VStack alignItems="flex-start" spacing="2">
            <CalendarDatePicker />
            {/* TODO: make filters container on next line scroll if it overflows the full window height */}
            <VStack paddingX="5" spacing="8" width="full">
                {user.isStasjon ? null : <CalendarStasjonFilter />}
                {user.isPartner ? null : <CalendarPartnerFilter />}
            </VStack>
        </VStack>
    ) : null;
};
