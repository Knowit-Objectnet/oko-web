import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ReactBigCalendar } from './ReactBigCalendar';
import { HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { StationFilter } from './StationFilter';
import { useCalendarView } from './hooks/useCalendarView';

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedStationId, setSelectedStation] = useState<number | undefined>();
    const view = useCalendarView();

    return (
        <>
            <Helmet>
                {/*TODO: create title from calendar state*/}
                <title>Kalender</title>
            </Helmet>
            <HStack spacing={5} padding={5} alignItems="flex-start" width="100%" height="100%">
                <VStack alignItems="flex-start" spacing={5}>
                    <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    <StationFilter selectedStationId={selectedStationId} onStationIdChange={setSelectedStation} />
                </VStack>
                <Box flex="1" width="100%" height="100%">
                    <ReactBigCalendar
                        selectedDate={selectedDate}
                        selectedView={view}
                        selectedStationId={selectedStationId}
                        onDateChange={setSelectedDate}
                    />
                </Box>
            </HStack>
        </>
    );
};
