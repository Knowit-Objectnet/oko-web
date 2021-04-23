import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => {
    return (
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
            {...props}
        />
    );
};

const Center: React.FC = (props) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="flex-end"
            height={{ base: '100%', sm: 'auto' }}
            flexDirection={{ base: 'column', lg: 'row' }}
            _activeLink={{ color: 'red.500' }}
            {...props}
        />
    );
};

const iconStyle = {
    height: { base: 'auto', sm: '1em' },
    width: { base: 'auto', sm: '2rem' },
    maxWidth: '100%',
    flex: '1',
    sx: {
        svg: { fill: 'White' },
    },
};

//const NewIcon: React.FC = (props) => <Icon height="1em" sx={{"svg":{fill:"White"}}} {...props}/>

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
