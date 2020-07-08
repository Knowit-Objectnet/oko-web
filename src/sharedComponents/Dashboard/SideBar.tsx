import * as React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { Link as LocalLink } from 'react-router-dom';
import { Colors, Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

const duration = 500;

const sidebarStyle = {
    transition: `width ${duration}ms`,
};

interface IIndexable {
    [key: string]: any;
}

const sidebarTransitionStyles: IIndexable = {
    entering: { width: 0 },
    entered: { width: '200px' },
    exiting: { width: '200px' },
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
    color: ${(props) => (props.to !== props.current ? Colors.White : Colors.Blue)};
    margin-bottom: 15px;
    border-bottom: solid 2px ${(props) => (props.to !== props.current ? Colors.White : Colors.Blue)};
    width: fit-content;
    white-space: nowrap;
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
                                    {keycloak.hasRealmRole(Roles.Oslo) ? (
                                        <Link current={history.location.pathname} to="/">
                                            Oversikt
                                        </Link>
                                    ) : null}
                                    <Link current={history.location.pathname} to="/calendar">
                                        Kalender
                                    </Link>
                                    {keycloak.hasRealmRole(Roles.Oslo) ? (
                                        <>
                                            <Link current={history.location.pathname} to="/statistics">
                                                Statistikk
                                            </Link>
                                            <Link current={history.location.pathname} to="/partners">
                                                Samarbeidspartnere
                                            </Link>
                                        </>
                                    ) : null}
                                    {keycloak.hasRealmRole(Roles.Partner) || keycloak.hasRealmRole(Roles.Ambassador) ? (
                                        <>
                                            <Link current={history.location.pathname} to="/reporting">
                                                Vektuttak
                                            </Link>
                                            <Link current={history.location.pathname} to="/history">
                                                Historikk
                                            </Link>
                                            <Link current={history.location.pathname} to="/info">
                                                Info fra Oslo kommune
                                            </Link>
                                        </>
                                    ) : null}
                                </Links>
                            )}
                        </Transition>
                    </Padding>
                </Wrapper>
            )}
        </Transition>
    );
};
