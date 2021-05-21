import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './CalendarComponent';
import { HStack, VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { CalendarDatePicker } from './CalendarDatePicker';
import { CalendarProvider } from './CalendarProvider';
import { CalendarStasjonFilter } from './CalendarStasjonFilter';

const Kalender: React.FC = () => (
    <CalendarProvider>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <HStack as="main" spacing="5" padding="5" alignItems="flex-start" width="full" height="full">
            <VStack alignItems="flex-start" spacing="5" flex="0">
                <CalendarDatePicker />
                <CalendarStasjonFilter />
            </VStack>
            <Box flex="1" minHeight="full" height="full">
                <CalendarComponent />
            </Box>
        </HStack>
    </CalendarProvider>
);

export default Kalender;
