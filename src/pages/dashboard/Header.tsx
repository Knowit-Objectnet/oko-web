import * as React from 'react';
import { Navigation } from './Navigation';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { RouterLink } from '../../routing/RouterLink';
import { Box, HStack, Icon } from '@chakra-ui/react';
import Profile from '../../assets/Default_profile_pic.svg';

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
                height={{ base: 'navbar.mobile', tablet: 'navbar.default' }}
                spacing={{ base: '0', tablet: '10' }}
                paddingRight="4"
                justifyContent="space-between"
                position="relative"
            >
                <RouterLink to="/" height="100%" aria-label="Til forsiden">
                    <Logo />
                </RouterLink>
                <Box
                    flex="1"
                    width="full"
                    height={{ base: '16', tablet: 'full' }}
                    position={{ base: 'fixed', tablet: 'static' }}
                    bottom={{ base: '0', tablet: 'unset' }}
                    left={{ base: '0', tablet: 'unset' }}
                    backgroundColor="inherit"
                    // TODO: Z-index because of react-big-calendar default styles, try to remove after customizing stules for calendar
                    zIndex="docked"
                >
                    <Navigation />
                </Box>
                <RouterLink
                    to="/loggut"
                    padding={{ base: '2', tablet: '3' }}
                    fontSize={{ base: 'sm', tablet: 'lg' }}
                    fontWeight="normal"
                    minHeight="3"
                    border="2px solid"
                    borderColor="onPrimary"
                    color="onPrimary"
                    display="block"
                    verticalAlign="center"
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
