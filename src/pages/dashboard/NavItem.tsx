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
        fontSize={{ base: 'md', tablet: 'xl' }}
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
        flexDirection={{ base: 'column', tablet: 'row' }}
        {...props}
    />
);

const iconStyle = {
    height: { base: 'auto', tablet: '4' },
    width: { base: 'auto', tablet: '8' },
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
            <Box as="span" marginLeft={{ base: '0', tablet: '1' }}>
                {props.label}
            </Box>
        </Center>
    </StyledNavLink>
);
