import * as React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { Link as LocalLink } from 'react-router-dom';
import { Colors, Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import People from '../../assets/People.svg';
import Location from '../../assets/Location.svg';
import Plus from '../../assets/Plus.svg';
import Weight from '../../assets/Weight.svg';
import PencilRec from '../../assets/PencilRec.svg';
import User from '../../assets/Default_profile_pic.svg';
import Cog from '../../assets/Cog.svg';

const duration = 500;

const sidebarStyle = {
    transition: `width ${duration}ms`,
};

interface IIndexable {
    [key: string]: any;
}

const sidebarTransitionStyles: IIndexable = {
    entering: { width: 0 },
    entered: { width: '220px' },
    exiting: { width: '220px' },
    exited: { width: 0 },
};

const linkStyle = {
    transition: `opacity ${duration}ms`,
};
const linkTransitionStyles: IIndexable = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    background-color: ${Colors.DarkBlue};
    box-sizing: border-box;
`;

const Padding = styled.div`
    padding: 20px;
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
`;

interface LinkProps {
    current: string;
    to: string;
}

const Link = styled(LocalLink)<LinkProps>`
    display: flex;
    align-items: center;
    color: ${(props) => (props.to !== props.current ? Colors.White : Colors.Blue)};
    fill: ${(props) => (props.to !== props.current ? Colors.White : Colors.Blue)};
    margin-bottom: 15px;
    width: fit-content;
    white-space: nowrap;
    font-weight: bold;
`;

const StyledPeople = styled(People)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledLocation = styled(Location)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledPlus = styled(Plus)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledWeight = styled(Weight)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledPencilRec = styled(PencilRec)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledUser = styled(User)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

const StyledCog = styled(Cog)`
    fill: inherit;
    width: 1.5em;
    margin-right: 10px;
`;

interface SideBarProps {
    isVisible: boolean;
}

/**
 * SideBar for the animated side navigation
 */
export const SideBar: React.FC<SideBarProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // History instance
    const history = useHistory();

    return (
        <Transition in={props.isVisible} timeout={0}>
            {(state) => (
                <Wrapper style={{ ...sidebarStyle, ...sidebarTransitionStyles[state] }}>
                    <Padding>
                        <Transition in={props.isVisible} timeout={0}>
                            {(state) => (
                                <Links
                                    style={{
                                        ...linkStyle,
                                        ...linkTransitionStyles[state],
                                    }}
                                >
                                    <Link current={history.location.pathname} to="/partners">
                                        <StyledPeople /> Sam.partnere
                                    </Link>
                                    <Link current={history.location.pathname} to="/stations">
                                        <StyledLocation /> Stasjonene
                                    </Link>
                                    {keycloak.hasRealmRole(Roles.Oslo) ? (
                                        <Link current={history.location.pathname} to="/">
                                            <StyledPlus /> Opprett hendelse
                                        </Link>
                                    ) : null}
                                    {keycloak.hasRealmRole(Roles.Partner) ? (
                                        <Link current={history.location.pathname} to="/">
                                            <StyledPlus /> Søk ekstrauttak
                                        </Link>
                                    ) : null}
                                    {keycloak.hasRealmRole(Roles.Ambassador) ? (
                                        <Link current={history.location.pathname} to="/">
                                            <StyledPlus /> Utlys ekstrauttak
                                        </Link>
                                    ) : null}
                                    {keycloak.hasRealmRole(Roles.Partner) ? (
                                        <Link current={history.location.pathname} to="/reporting">
                                            <StyledWeight /> Vektuttak
                                        </Link>
                                    ) : null}
                                    <Link current={history.location.pathname} to="/">
                                        <StyledPencilRec /> Skriv beskjed
                                    </Link>
                                    <Link current={history.location.pathname} to="/profile">
                                        <StyledUser /> Min side
                                    </Link>
                                    <Link current={history.location.pathname} to="/settings">
                                        <StyledCog /> Innstillinger
                                    </Link>
                                </Links>
                            )}
                        </Transition>
                    </Padding>
                </Wrapper>
            )}
        </Transition>
    );
};
