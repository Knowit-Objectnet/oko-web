import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ReactBigCalendar } from './ReactBigCalendar';
import { HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { DatePicker } from './DatePicker';
import { useState } from 'react';
import { View } from 'react-big-calendar';

export const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedView, setSelectedView] = useState<View>('work_week');
    return (
        <>
            <Helmet>
                {/*TODO: create title from calendar state*/}
                <title>Kalender</title>
            </Helmet>
            <HStack spacing={5} padding={5} alignItems="flex-start" width="100%" height="100%">
                <VStack alignItems="flex-start" spacing={5}>
                    <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    {/*<StationFilter />*/}
                </VStack>
                <Box flex="1" width="100%" height="100%">
                    <ReactBigCalendar
                        selectedDate={selectedDate}
                        selectedView={selectedView}
                        onDateChange={setSelectedDate}
                        onViewChange={setSelectedView}
                    />
                </Box>
            </HStack>
        </>
    );
};
