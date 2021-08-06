import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Stack } from '@chakra-ui/react';
import { CalendarProvider } from './CalendarProvider';
import { CalendarSidebar } from './components/CalendarSidebar';

const Kalender: React.FC = () => (
    <CalendarProvider>
        <Helmet>
            {/*TODO: create title from calendar state*/}
            <title>Kalender</title>
        </Helmet>
        <Stack
            direction="row"
            as="main"
            padding="5"
            alignItems="flex-start"
            minWidth="full"
            spacing="4"
            minHeight="min-content"
        >
            <CalendarSidebar />
            <CalendarComponent />
        </Stack>
    </CalendarProvider>
);

export default Kalender;
