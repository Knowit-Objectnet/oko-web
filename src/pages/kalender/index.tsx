import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Link, Stack } from '@chakra-ui/react';
import { CalendarProvider } from './CalendarProvider';
import { CalendarDatePicker } from './components/CalendarDatePicker';
import { CalendarFilters } from './components/CalendarFilters';
import { NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/layout';

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
                <Box display={{ base: 'none', tablet: 'flex' }} textDecorationLine="underline">
                    <Link as={NavLink} to="/personvern" marginTop="4">
                        Om personvern i tjenesten
                    </Link>
                </Box>
            </Stack>
            <CalendarComponent />
            <Box display={{ base: 'box', tablet: 'none' }} width="full" textAlign="center">
                <Link as={NavLink} to="/personvern" textDecorationLine="underline">
                    Om personvern i tjenesten
                </Link>
            </Box>
        </Stack>
    </CalendarProvider>
);

export default Kalender;
