import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CalendarComponent } from './components/CalendarComponent';
import { Stack, VStack } from '@chakra-ui/react';
import { CalendarDatePicker } from './components/CalendarDatePicker';
import { CalendarProvider } from './CalendarProvider';
import { CalendarStasjonFilter } from './components/CalendarStasjonFilter';
import { CalendarPartnerFilter } from './components/CalendarPartnerFilter';
import { useAuth } from '../../auth/useAuth';

const Kalender: React.FC = () => {
    const { user } = useAuth();

    return (
        <CalendarProvider>
            <Helmet>
                {/*TODO: create title from calendar state*/}
                <title>Kalender</title>
            </Helmet>
            <Stack
                direction="row"
                as="main"
                padding="5"
                paddingLeft="0"
                alignItems="flex-start"
                minWidth="full"
                spacing="4"
                minHeight="min-content"
            >
                <VStack alignItems="flex-start" spacing="6">
                    <CalendarDatePicker />
                    {/* TODO: make filters container on next line scroll if it overflows the full window height */}
                    <VStack paddingX="5" spacing="8" width="full">
                        {user.isStasjon ? null : <CalendarStasjonFilter />}
                        {user.isPartner ? null : <CalendarPartnerFilter />}
                    </VStack>
                </VStack>
                <CalendarComponent />
            </Stack>
        </CalendarProvider>
    );
};

export default Kalender;
