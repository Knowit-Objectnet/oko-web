import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';

const Wrapper = styled.div``;

interface AmbassadorCalendarProps {
    date: Date;
    isToggled: boolean;
}

export const AmbassadorCalendar: React.FC<AmbassadorCalendarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    return <Wrapper></Wrapper>;
};
