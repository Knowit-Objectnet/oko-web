import * as React from 'react';
import Herretoalett from '../../assets/Herretoalett.svg';
import List from '../../assets/List.svg';
import Bell from '../../assets/Bell.svg';
import Calendar from '../../assets/Calendar.svg';
import Filtrer from '../../assets/Filtrer.svg';
import Weight from '../../assets/Weight.svg';
import { NavItem, NavItemWithNotification, NotificationEnum } from './NavItem';
import { useAuth, UserInfo } from '../../auth/useAuth';
import { HStack } from '@chakra-ui/react';
import { colors } from '../../theme/foundations/colors';

const getNavItemsForRole = (user: UserInfo) => {
    if (user.isAdmin)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/avtaler" icon={<Herretoalett />} label="Partnere" />
                <NavItem path="/ekstrahenting" icon={<Bell />} label="Ekstrahenting" />
                <NavItem path="/innstillinger" icon={<Filtrer />} label="Innstillinger" />
                <NavItem path="/vekt" icon={<Weight />} label="Vekt" />
                {/*<NavItemWithNotification*/}
                {/*    path="/vekt"*/}
                {/*    icon={<Weight />}*/}
                {/*    label="Vekt"*/}
                {/*    notification={{*/}
                {/*        color: colors.Red,*/}
                {/*        textColor: colors.DarkBlue,*/}
                {/*        type: NotificationEnum.VEKT,*/}
                {/*        numMonthsBack: 2,*/}
                {/*    }}*/}
                {/*/>*/}
            </>
        );
    else if (user.isPartner)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/minavtale" icon={<List />} label="Mine avtaler" />
                <NavItem path="/ekstrahenting" icon={<Bell />} label="Ekstrahenting" />
                <NavItem path="/vekt" icon={<Weight />} label="Vekt" />
                {/*<NavItemWithNotification*/}
                {/*    path="/vekt"*/}
                {/*    icon={<Weight />}*/}
                {/*    label="Vekt"*/}
                {/*    notification={{*/}
                {/*        color: colors.Red,*/}
                {/*        textColor: colors.DarkBlue,*/}
                {/*        type: NotificationEnum.VEKT,*/}
                {/*        numMonthsBack: 2,*/}
                {/*    }}*/}
                {/*/>*/}
            </>
        );
    else if (user.isStasjon)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/avtaler" icon={<Herretoalett />} label="Partnere" />
                <NavItem path="/ekstrahenting" icon={<Bell />} label="Ekstrahenting" />
                <NavItem path="/vekt" icon={<Weight />} label="Vekt" />
                {/*<NavItemWithNotification*/}
                {/*    path="/vekt"*/}
                {/*    icon={<Weight />}*/}
                {/*    label="Vekt"*/}
                {/*    notification={{*/}
                {/*        color: colors.Red,*/}
                {/*        textColor: colors.DarkBlue,*/}
                {/*        type: NotificationEnum.VEKT,*/}
                {/*        numMonthsBack: 2,*/}
                {/*    }}*/}
                {/*/>*/}
            </>
        );
    return null;
};

export const Navigation: React.FC = () => {
    const { user } = useAuth();
    return (
        <HStack width="full" height="full" spacing={{ base: '3', xl: '6' }}>
            {getNavItemsForRole(user)}
        </HStack>
    );
};
