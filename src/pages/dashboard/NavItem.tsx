import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Box, Flex, Link, LinkProps } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { Circle } from '@chakra-ui/react';
import { useAuth } from '../../auth/useAuth';
import { ApiHenting, ApiHentingParams } from '../../services/henting/HentingService';
import { useHentinger } from '../../services/henting/useHentinger';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { endOfToday, subMonths } from 'date-fns';

const StyledNavLink: React.FC<LinkProps | NavLinkProps> = (props) => (
    <Link
        as={NavLink}
        color="LightBeige"
        height="full"
        borderBottom="solid 6px transparent"
        paddingTop="3"
        display="flex"
        alignItems="flex-end"
        userSelect="none"
        fontWeight="normal"
        flexGrow={{ base: 1, tablet: 'unset' }}
        fontSize={{ base: 'sm', tablet: 'xl' }}
        _activeLink={{
            color: 'accent',
            borderBottomColor: 'accent',
            svg: { fill: 'accent' },
        }}
        _hover={{
            textDecoration: 'none',
            borderBottomColor: 'LightBeige',
        }}
        {...props}
    />
);

const Center: React.FC = (props) => (
    <Flex
        alignItems="center"
        justifyContent="center"
        height="full"
        width="full"
        paddingBottom={{ base: '1.5', tablet: '0' }}
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
        svg: { fill: 'LightBeige' },
    },
};

interface Props {
    path: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean;
}

export const NavItem: React.FC<Props> = ({ path, icon, label, exact }) => {
    return (
        <StyledNavLink to={path} exact={exact}>
            <Center>
                <Icon
                    {...iconStyle}
                    minWidth={{ base: '6', tablet: '4', desktop: '6' }}
                    minHeight={{ base: '6', tablet: '4', desktop: '6' }}
                    textAlign="center"
                >
                    {icon}
                </Icon>
                <Box
                    as={Flex}
                    paddingLeft={{ base: '0', tablet: '1' }}
                    alignItems="center"
                    fontSize={{ base: '16', tablet: '16', xl: '20' }}
                    whiteSpace="nowrap"
                    marginTop={{ base: '1', tablet: '0' }}
                >
                    {label}
                </Box>
            </Center>
        </StyledNavLink>
    );
};

export enum NotificationEnum {
    'VEKT',
}

export interface NotificationProps {
    notification: { color: string; textColor: string; type: NotificationEnum; numMonthsBack?: number }; //TODO: Create a function instead to get number of notifications
}

export const NavItemWithNotification: React.FC<Props & NotificationProps> = ({
    path,
    icon,
    label,
    exact,
    notification,
}) => {
    return (
        <StyledNavLink to={path} exact={exact}>
            <Center>
                <Icon {...iconStyle}>{icon}</Icon>
                <Box as={Flex} marginLeft={{ base: '0', tablet: '1' }} alignItems="center">
                    {label}
                    {notification.type === NotificationEnum.VEKT ? (
                        <VektNotification notification={notification} />
                    ) : null}
                </Box>
            </Center>
        </StyledNavLink>
    );
};

export const VektNotification: React.FC<NotificationProps> = ({ notification }) => {
    const { user } = useAuth();
    const before = endOfToday();
    const after = subMonths(before, notification.numMonthsBack || 1);
    const hentingParametere: ApiHentingParams = {
        after: dateTimeToStringIgnoreTimezone(after),
        before: dateTimeToStringIgnoreTimezone(before),
    };

    if (user.isStasjon) hentingParametere.stasjonId = user.aktorId;
    else if (user.isPartner) hentingParametere.aktorId = user.aktorId;

    const { data: hentinger } = useHentinger(hentingParametere, { keepPreviousData: true });
    const hentingType: Array<ApiHenting> = [];
    hentinger?.map((hentinger) => {
        if (hentinger.planlagtHenting) hentingType.push(hentinger.planlagtHenting);
        if (hentinger.ekstraHenting) hentingType.push(hentinger.ekstraHenting);
    });
    const now = new Date();
    const manglerVeiing: Array<ApiHenting> = hentingType.filter(
        (henting) => henting.vektregistreringer.length <= 0 && parseISOIgnoreTimezone(henting.startTidspunkt) <= now,
    );

    const count: number = manglerVeiing.length;

    return (
        <>
            {count > 0 ? (
                <Circle
                    size={7}
                    backgroundColor={notification.color}
                    fontSize="sm"
                    marginLeft={2}
                    textColor={notification.textColor}
                >
                    {count}
                </Circle>
            ) : null}
        </>
    );
};
