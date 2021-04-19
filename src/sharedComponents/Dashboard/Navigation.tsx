import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import Weight from '../../assets/Weight.svg';
import Bell from '../../assets/Bell.svg';
import { Roles } from '../../types';
import { NavItem } from './NavItem';

const Nav = styled.nav`
    display: flex;
    flex: 1;
    height: 100%;
`;

export const Navigation: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);

    const getNavItemsForRole = () => {
        if (userIsAdmin)
            return (
                <>
                    <NavItem path="/oversikt" icon={<List />} label="Oversikt" />
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/stasjoner" icon={<List />} label="Stasjoner" />
                </>
            );
        else if (userIsPartner)
            return (
                <>
                    <NavItem path="/kalender" icon={<Calendar />} label="Kalender" />
                    <NavItem path="/vektuttak" icon={<Weight />} label="Vektuttak" />
                    <NavItem path="/varsler" icon={<Bell />} label="Varsler" />
                </>
            );
        else if (userIsStation)
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
