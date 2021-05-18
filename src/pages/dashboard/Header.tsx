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
                    padding={{ base: '2', md: '3' }}
                    fontSize={{ base: 'sm', md: 'lg' }}
                    fontWeight="normal"
                    minHeight="3"
                    border="2px solid White"
                    color="White"
                    display="block"
                    verticalAlign="center"
                >
                    <Icon
                        as={Profile}
                        marginRight={{ base: '2', md: '3' }}
                        fill="White"
                        height={{ base: '20px', md: '32px' }}
                        width="auto"
                        aria-hidden
                    />
                    Logg ut
                </RouterLink>
            </HStack>
        </header>
    );
};
