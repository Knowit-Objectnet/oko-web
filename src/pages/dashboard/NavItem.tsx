import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => (
    <Link
        as={NavLink}
        color="White"
        borderBottom={{ base: 'none', sm: 'solid 4px transparent' }}
        display="flex"
        alignItems="flex-end"
        userSelect="none"
        fontWeight="bold"
        fontSize={{ base: 'md', sm: 'xl' }}
        _activeLink={{
            color: 'secondary.light',
            borderBottomColor: 'secondary.light',
            svg: { fill: 'secondary.light' },
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
        alignItems="center"
        justifyContent="flex-end"
        height={{ base: '100%', sm: 'auto' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        {...props}
    />
);

const iconStyle = {
    height: { base: 'auto', sm: '1em' },
    width: { base: 'auto', sm: '2rem' },
    maxWidth: '100%',
    flex: '1',
    sx: {
        svg: { fill: 'White' },
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
            <Box as="span" marginLeft={{ base: '0', lg: 'sm' }}>
                {props.label}
            </Box>
        </Center>
    </StyledNavLink>
);
