import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Link, Stack } from '@chakra-ui/react';
import { CalendarProvider } from './CalendarProvider';
import { CalendarDatePicker } from './components/CalendarDatePicker';
import { CalendarFilters } from './components/CalendarFilters';
import { NavLink } from 'react-router-dom';

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
                <Link
                    as={NavLink}
                    to="/personvern"
                    textDecorationLine="underline"
                    display={{ base: 'none', tablet: 'flex' }}
                >
                    Om personvern i tjenesten
                </Link>
            </Stack>
            <CalendarComponent />
            <Link
                as={NavLink}
                to="/personvern"
                textDecorationLine="underline"
                display={{ base: 'box', tablet: 'none' }}
            >
                Om personvern i tjenesten
            </Link>
        </Stack>
    </CalendarProvider>
);

export default Kalender;
