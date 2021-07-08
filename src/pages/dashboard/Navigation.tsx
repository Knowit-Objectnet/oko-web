import * as React from 'react';
import List from '../../assets/List.svg';
import Bell from '../../assets/Bell.svg';
import Calendar from '../../assets/Calendar.svg';
import Location from '../../assets/Location.svg';
import Bibliotek from '../../assets/Bibliotek.svg';
import { NavItem } from './NavItem';
import { useAuth, UserInfo } from '../../auth/useAuth';
import { HStack } from '@chakra-ui/react';

const getNavItemsForRole = (user: UserInfo) => {
    if (user.isAdmin)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/avtaler" icon={<List />} label="Avtaler" />
                <NavItem path="/stasjoner" icon={<Location />} label="Stasjoner" />
                <NavItem path="/kategorier" icon={<Bibliotek />} label="Kategorier" />
                <NavItem path="/ekstrauttak" icon={<Bell />} label="Ekstrauttak" />
            </>
        );
    else if (user.isPartner)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/minavtale" icon={<List />} label="Mine avtaler" />
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
