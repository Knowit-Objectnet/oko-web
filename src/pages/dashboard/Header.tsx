import * as React from 'react';
import { Navigation } from './Navigation';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { RouterLink } from '../../routing/RouterLink';
import { Box, HStack } from '@chakra-ui/react';

const Logo: React.FC = (props) => (
    <Box height="100%" sx={{ svg: { height: '100%' } }} {...props}>
        <OsloKommuneLogo />
    </Box>
);

export const Header: React.FC = () => {
    return (
        <header>
            <HStack
                as="nav"
                backgroundColor="primary"
                height={{ base: '64px', md: '100px' }}
                spacing={{ base: 0, md: 10 }}
                paddingRight="4"
                justifyContent="space-between"
                position="relative"
            >
                <RouterLink to="/" height="100%" aria-label="Til forsiden">
                    <Logo />
                </RouterLink>
                <Box
                    flex="1"
                    width="100%"
                    height={{ base: '64px', md: '100%' }}
                    position={{ base: 'fixed', md: 'static' }}
                    bottom={{ base: 0, md: 'unset' }}
                    left={{ base: 0, md: 'unset' }}
                    backgroundColor="inherit"
                    // TODO: Z-index because of react-big-calendar default styles, try to remove after customizing stules for calendar
                    zIndex="docked"
                >
                    <Navigation />
                </Box>
                <RouterLink
                    to="/loggut"
                    padding={{ base: '2', md: '4' }}
                    fontSize={{ base: 'sm', md: 'lg' }}
                    fontWeight="normal"
                    minHeight="3"
                    border="2px solid White"
                    color="White"
                >
                    Logg ut
                </RouterLink>
            </HStack>
        </header>
    );
};
