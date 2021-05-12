import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => (
    <Link
        as={NavLink}
        color="white"
        flexGrow={0}
        height="100%"
        borderBottom="solid 6px transparent"
        paddingTop={3}
        display="flex"
        alignItems="flex-end"
        userSelect="none"
        fontWeight="normal"
        fontSize={{ base: '1rem', md: '20px' }}
        _activeLink={{
            color: 'secondary',
            borderBottomColor: 'secondary',
            svg: { fill: 'secondary' },
        }}
        _hover={{
            textDecoration: 'none',
            borderBottomColor: 'white',
        }}
        {...props}
    />
);

const Center: React.FC = (props) => (
    <Flex
        textStyle="menuItem"
        alignItems="center"
        justifyContent="center"
        height="100%"
        flex={1}
        flexDirection={{ base: 'column', md: 'row' }}
        {...props}
    />
);

const iconStyle = {
    height: { base: 'auto', md: '1em' },
    width: { base: 'auto', md: '2rem' },
    maxWidth: '100%',
    flex: '1',
    sx: {
        svg: { fill: 'white' },
    },
};

interface Props {
    path: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean;
}

export const NavItem: React.FC<Props> = (props) => (
    <StyledNavLink to={props.path} exact={props.exact}>
        <Center>
            <Icon {...iconStyle}>{props.icon}</Icon>
            <Box as="span" marginLeft={{ base: 0, md: 1 }}>
                {props.label}
            </Box>
        </Center>
    </StyledNavLink>
);
