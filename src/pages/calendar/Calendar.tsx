import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ReactBigCalendar } from './ReactBigCalendar';
import { HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { DatePicker } from './DatePicker';
import { StationFilter } from './StationFilter';
import { CalendarProvider } from './CalendarProvider';

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
