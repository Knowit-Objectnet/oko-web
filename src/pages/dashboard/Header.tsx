import * as React from 'react';
import { Navigation } from './Navigation';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { Flex } from '@chakra-ui/layout';
import { RouterLink } from '../../routing/RouterLink';
import { Box } from '@chakra-ui/react';

const ChakraHeader: React.FC = (props) => (
    <Flex
        width="100%"
        height={{ base: '16', sm: '32' }}
        justifyContent="space-between"
        alignItems="center"
        paddingRight={{ base: '1', sm: '10' }}
        flexDirection="row"
        backgroundColor="primary.default"
        {...props}
    />
);

const Logo: React.FC = (props) => (
    <Box display={{ base: 'none', md: 'block' }} height="100%" sx={{ svg: { height: '100%' } }} {...props}>
        <OsloKommuneLogo />
    </Box>
);

export const Header: React.FC = () => {
    return (
        <ChakraHeader>
            <RouterLink to="/" height="100%" marginRight={{ base: '1', md: '12', lg: '24' }}>
                <Logo />
            </RouterLink>
            <Navigation />
            <RouterLink
                to="/loggut"
                padding={{ base: '2', sm: '4' }}
                fontSize="lg"
                fontWeight="normal"
                minHeight="3"
                border="2px solid White"
                color="White"
            >
                Logg ut
            </RouterLink>
        </ChakraHeader>
    );
};
