import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { Circle } from '@chakra-ui/react';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => (
    <Link
        as={NavLink}
        color="onPrimary"
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
            borderBottomColor: 'onPrimary',
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
        svg: { fill: 'onPrimary' },
    },
};

interface Props {
    path: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean;
    notification?: { color: string; textColor: string; count?: () => number }; //TODO: Create a function instead to get number of notifications
}

export const NavItem: React.FC<Props> = (props) => (
    <StyledNavLink to={props.path} exact={props.exact}>
        <Center>
            <Icon {...iconStyle}>{props.icon}</Icon>
            <Box as={Flex} marginLeft={{ base: '0', tablet: '1' }} alignItems="center">
                {props.label}
                {props.notification ? (
                    <Circle
                        size={7}
                        backgroundColor={props.notification.color}
                        fontSize="sm"
                        marginLeft={2}
                        textColor={props.notification.textColor}
                    >
                        1
                    </Circle>
                ) : null}
            </Box>
        </Center>
    </StyledNavLink>
);
