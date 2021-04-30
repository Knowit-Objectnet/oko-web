import * as React from 'react';
import { StationFilter } from './StationFilter';
import { Helmet } from 'react-helmet';
import { ReactBigCalendar } from './ReactBigCalendar';
import { HStack, VStack } from '@chakra-ui/react';
import { CalendarProvider } from './CalendarProvider';
import { Box } from '@chakra-ui/layout';
import { DatePicker } from './DatePicker';

export const Calendar: React.FC = () => (
    <CalendarProvider>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <HStack spacing={5} padding={5} alignItems="flex-start" width="100%" height="100%">
            <VStack alignItems="flex-start" spacing={5}>
                <DatePicker />
                <StationFilter />
            </VStack>
            <Box flex="1" width="100%" height="100%">
                <ReactBigCalendar />
            </Box>
        </HStack>
    </CalendarProvider>
);
