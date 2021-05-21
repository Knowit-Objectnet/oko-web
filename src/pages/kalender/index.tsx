import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './CalendarComponent';
import { Stack, VStack } from '@chakra-ui/react';
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
        <Stack direction="row" as="main" spacing="5" padding="5" alignItems="flex-start" minWidth="full">
            <VStack alignItems="flex-start" spacing="5">
                <CalendarDatePicker />
                <CalendarStasjonFilter />
            </VStack>
            <CalendarComponent />
        </Stack>
    </CalendarProvider>
);

export default Kalender;
