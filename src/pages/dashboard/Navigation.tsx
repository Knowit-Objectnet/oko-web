import * as React from 'react';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import { NavItem } from './NavItem';
import { useAuth, UserInfo } from '../../auth/useAuth';
import { HStack } from '@chakra-ui/react';

const getNavItemsForRole = (user: UserInfo) => {
    if (user.isAdmin)
        return (
            <>
                <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                <NavItem path="/avtaler" icon={<List />} label="Avtaler" />
            </>
        );
    else if (user.isPartner) return <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />;
    else if (user.isStasjon) return <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />;
    return null;
};

export const Navigation: React.FC = () => {
    const { user } = useAuth();
    return (
        <HStack width="100%" height="100%" spacing={6} justifyContent={{ base: 'center', md: 'flex-start' }}>
            {getNavItemsForRole(user)}
        </HStack>
    );
};
