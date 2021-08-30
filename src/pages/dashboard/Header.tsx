import * as React from 'react';
import { Navigation } from './Navigation';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { RouterLink } from '../../routing/RouterLink';
import { Box, HStack, Icon } from '@chakra-ui/react';
import Profile from '../../assets/Default_profile_pic.svg';

export const Header: React.FC = () => {
    return (
        <header>
            <HStack
                as="nav"
                backgroundColor="primary"
                height={{ base: 'navbar.mobile', desktop: 'navbar.default' }}
                spacing={{ base: '0', tablet: '2', desktop: '10' }}
                paddingRight="4"
                justifyContent="space-between"
                position="relative"
                maxWidth="100vw"
                overflowX="auto"
            >
                <RouterLink to="/" height="full" aria-label="Til forsiden">
                    <Icon as={OsloKommuneLogo} height="full" width="auto" aria-hidden />
                </RouterLink>
                <Box
                    flex="1"
                    width={{ base: '100vw', tablet: 'full' }}
                    height={{ base: 'navbar.mobile', tablet: 'full' }}
                    position={{ base: 'fixed', tablet: 'static' }}
                    bottom={{ base: '0', tablet: 'unset' }}
                    left={{ base: '0', tablet: 'unset' }}
                    paddingX={{ base: '3', tablet: '0' }}
                    backgroundColor="inherit"
                    // TODO: Z-index because of react-big-calendar default styles, try to remove after customizing stules for calendar
                    zIndex="sticky"
                    overflowX={{ base: 'auto', tablet: 'unset' }}
                    maxWidth="100vw"
                >
                    <Navigation />
                </Box>
                <RouterLink
                    to="/loggut"
                    padding={{ base: '2', desktop: '3' }}
                    fontSize={{ base: 'sm', desktop: 'lg' }}
                    fontWeight="normal"
                    minHeight="3"
                    border="2px solid"
                    borderColor="onPrimary"
                    color="onPrimary"
                    display="block"
                    verticalAlign="center"
                    whiteSpace="nowrap"
                >
                    <Icon
                        as={Profile}
                        marginRight={{ base: '2', tablet: '3' }}
                        fill="onPrimary"
                        height={{ base: '5', tablet: '8' }}
                        width="auto"
                        aria-hidden
                    />
                    Logg ut
                </RouterLink>
            </HStack>
        </header>
    );
};
