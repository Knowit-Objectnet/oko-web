import * as React from 'react';
import styled from 'styled-components';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import Weight from '../../assets/Weight.svg';
import Bell from '../../assets/Bell.svg';
import { NavItem } from './NavItem';
import { useAuth } from '../../auth/useAuth';

const Nav = styled.nav`
    display: flex;
    flex: 1;
    height: 100%;
`;

export const Navigation: React.FC = () => {
    const { user } = useAuth();

    const getNavItemsForRole = () => {
        if (user.isAdmin)
            return (
                <>
                    <NavItem path="/oversikt" icon={<List />} label="Oversikt" />
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/stasjoner" icon={<List />} label="Stasjoner" />
                    <NavItem path="/partnere" icon={<List />} label="Partnere" />
                </>
            );
        else if (user.isPartner)
            return (
                <>
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/vektuttak" icon={<Weight />} label="Vektuttak" />
                    <NavItem path="/varsler" icon={<Bell />} label="Varsler" />
                </>
            );
        else if (user.isStasjon)
            return (
                <>
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/varsler" icon={<Bell />} label="Varsler" />
                </>
            );
        return null;
    };

    return <Nav>{getNavItemsForRole()}</Nav>;
};
