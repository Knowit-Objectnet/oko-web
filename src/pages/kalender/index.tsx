import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Stack } from '@chakra-ui/react';
import { CalendarProvider } from './CalendarProvider';
import { CalendarDatePicker } from './components/CalendarDatePicker';
import { CalendarFilters } from './components/CalendarFilters';

const Kalender: React.FC = () => (
    <CalendarProvider>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <Stack
            direction={{ base: 'column', tablet: 'row' }}
            as="main"
            padding="5"
            alignItems="flex-start"
            minWidth="full"
            spacing={{ base: '2', tablet: '6' }}
            minHeight="min-content"
        >
            <Stack direction={{ base: 'row', tablet: 'column' }} spacing="2" width={{ base: 'full', tablet: 'auto' }}>
                <CalendarDatePicker />
                <CalendarFilters />
            </Stack>
            <CalendarComponent />
        </Stack>
    </CalendarProvider>
);

export default Kalender;
