import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => (
    <Link
        as={NavLink}
        color="#F8F0DD"
        height="full"
        borderBottom="solid 6px transparent"
        paddingTop="3"
        display="flex"
        alignItems="flex-end"
        userSelect="none"
        fontWeight="normal"
        fontSize={{ base: 'md', tablet: 'xl' }}
        _activeLink={{
            color: 'accent',
            borderBottomColor: 'accent',
            svg: { fill: 'accent' },
        }}
        _hover={{
            textDecoration: 'none',
            borderBottomColor: '#F8F0DD',
        }}
        {...props}
    />
);

const Center: React.FC = (props) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        height="full"
        flex="1"
        flexDirection={{ base: 'column', tablet: 'row' }}
        {...props}
    />
);

const iconStyle = {
    height: { base: 'auto', tablet: '5' },
    width: { base: 'auto', tablet: '8' },
    maxWidth: 'full',
    flex: '1',
    sx: {
        svg: { fill: '#F8F0DD' },
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
