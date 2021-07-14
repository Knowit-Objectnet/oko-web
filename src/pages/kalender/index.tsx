import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Stack, VStack } from '@chakra-ui/react';
import { CalendarDatePicker } from './components/CalendarDatePicker';
import { CalendarProvider } from './CalendarProvider';
import { CalendarStasjonFilter } from './components/CalendarStasjonFilter';
import { CalendarPartnerFilter } from './components/CalendarPartnerFilter';

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
                <CalendarPartnerFilter />
            </VStack>
            <CalendarComponent />
        </Stack>
    </CalendarProvider>
);

export default Kalender;
