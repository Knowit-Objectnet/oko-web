import * as React from 'react';
import Herretoalett from '../../assets/Herretoalett.svg';
import List from '../../assets/List.svg';
import Bell from '../../assets/Bell.svg';
import Calendar from '../../assets/Calendar.svg';
import Filtrer from '../../assets/Filtrer.svg';
import { NavItem } from './NavItem';
import { useAuth, UserInfo } from '../../auth/useAuth';
import { HStack } from '@chakra-ui/react';

const getNavItemsForRole = (user: UserInfo) => {
    if (user.isAdmin)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/avtaler" icon={<Herretoalett />} label="Partner" />
                <NavItem path="/ekstrauttak" icon={<Bell />} label="Ekstrauttak" />
                <NavItem path="/innstillinger" icon={<Filtrer />} label="Innstillinger" />
            </>
        );
    else if (user.isPartner)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/minavtale" icon={<List />} label="Mine avtaler" />
                <NavItem path="/ekstrauttak" icon={<Bell />} label="Ekstrauttak" />
            </>
        );
    else if (user.isStasjon)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/ekstrauttak" icon={<Bell />} label="Ekstrauttak" />
            </>
        );
    return null;
};

export const Navigation: React.FC = () => {
    const { user } = useAuth();
    return (
        <HStack width="full" height="full" spacing="6" justifyContent={{ base: 'center', tablet: 'flex-start' }}>
            {getNavItemsForRole(user)}
        </HStack>
    );
};
