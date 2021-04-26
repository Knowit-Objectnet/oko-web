import * as React from 'react';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import Weight from '../../assets/Weight.svg';
import Bell from '../../assets/Bell.svg';
import { NavItem } from './NavItem';
import { useAuth } from '../../auth/useAuth';
import { Flex } from '@chakra-ui/react';

const Nav: React.FC = (props) => <Flex as="nav" height="100%" justifyContent="space-evenly" flex="1" {...props} />;

export const Navigation: React.FC = () => {
    const { user } = useAuth();

    const getNavItemsForRole = () => {
        if (user.isAdmin)
            return (
                <>
                    <NavItem path="/oversikt" icon={<List />} label="Oversikt" />
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/calendar" icon={<Calendar />} label="Calendar" />
                    <NavItem path="/stasjoner" icon={<List />} label="Stasjoner" />
                    <NavItem path="/partnere" icon={<List />} label="Partnere" />
                </>
            );
        else if (user.isPartner)
            return (
                <>
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/calendar" icon={<Calendar />} label="Calendar" />
                    <NavItem path="/vektuttak" icon={<Weight />} label="Vektuttak" />
                    <NavItem path="/varsler" icon={<Bell />} label="Varsler" />
                </>
            );
        else if (user.isStasjon)
            return (
                <>
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/calendar" icon={<Calendar />} label="Calendar" />
                    <NavItem path="/varsler" icon={<Bell />} label="Varsler" />
                </>
            );
        return null;
    };

    return <Nav>{getNavItemsForRole()}</Nav>;
};
