import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './CalendarComponent';
import { HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { CalendarDatePicker } from './CalendarDatePicker';
import { CalendarStationFilter } from './CalendarStationFilter';
import { CalendarProvider } from './CalendarProvider';

export const Calendar: React.FC = () => (
    <CalendarProvider>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <HStack as="main" spacing={5} padding={5} alignItems="flex-start" width="100%" height="100%">
            <VStack alignItems="flex-start" spacing={5} flex="0">
                <CalendarDatePicker />
                <CalendarStationFilter />
            </VStack>
            <Box flex="1" minHeight="100%" height="100%">
                <CalendarComponent />
            </Box>
        </HStack>
    </CalendarProvider>
);
