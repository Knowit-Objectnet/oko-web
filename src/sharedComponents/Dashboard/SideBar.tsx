import * as React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { Link as LocalLink, useHistory } from 'react-router-dom';
import { Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';
import People from '../../assets/People.svg';
import Location from '../../assets/Location.svg';
import Plus from '../../assets/Plus.svg';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import useModal from '../Modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { NewPickUp } from '../Events/NewPickUp';
import { NewEvent } from '../Events/NewEvent';

const duration = 500;

const sidebarStyle = {
    transition: `width ${duration}ms`,
};

interface IIndexable {
    [key: string]: any;
}

const sidebarTransitionStyles: IIndexable = {
    entering: { width: 0 },
    entered: { width: '250px' },
    exiting: { width: '250px' },
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
    background-color: ${(props) => props.theme.colors.DarkBlue};
    box-sizing: border-box;
`;

const Padding = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    color: ${(props) => (props.to !== props.current ? props.theme.colors.White : props.theme.colors.Blue)};
    fill: ${(props) => (props.to !== props.current ? props.theme.colors.White : props.theme.colors.Blue)};
    margin-bottom: 15px;
    width: fit-content;
    white-space: nowrap;
    font-weight: bold;
`;

const FakeLink = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.White};
    fill: ${(props) => props.theme.colors.White};
    margin-bottom: 15px;
    width: fit-content;
    white-space: nowrap;
    font-weight: bold;
    cursor: pointer;
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

const LogoWrapper = styled.div`
    width: 100%;

    @media screen and (min-width: 1100px) {
        display: none;
    }
`;

const Logo = styled(OsloKommuneLogo)`
    width: 100%;
`;

interface Props {
    isVisible: boolean;
    onClick: () => void;
}

/**
 * SideBar for the animated side navigation
 */
export const SideBar: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    const userIsStation = keycloak.hasRealmRole(Roles.Ambassador);

    const history = useHistory();
    const modal = useModal();

    const closeModalOnSuccess = (successful: boolean) => {
        if (successful) {
            modal.remove();
            props.onClick();
        }
    };

    const handleNewPickUpClick = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewPickUp end={end} afterSubmit={closeModalOnSuccess} start={start} />);
    };

    const handleNewEventClick = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewEvent end={end} afterSubmit={closeModalOnSuccess} start={start} />);
    };

    return (
        <Transition in={props.isVisible} timeout={0}>
            {(state) => (
                <Wrapper style={{ ...sidebarStyle, ...sidebarTransitionStyles[state] }}>
                    <Padding>
                        <Transition in={props.isVisible} timeout={0}>
                            {(state) => (
                                <>
                                    <Links
                                        style={{
                                            ...linkStyle,
                                            ...linkTransitionStyles[state],
                                        }}
                                    >
                                        <Link
                                            current={history.location.pathname}
                                            to="/partners"
                                            onClick={props.onClick}
                                        >
                                            <StyledPeople /> Samarbeidspartnere
                                        </Link>
                                        <Link
                                            current={history.location.pathname}
                                            to="/stations"
                                            onClick={props.onClick}
                                        >
                                            <StyledLocation /> Stasjonene
                                        </Link>
                                        {userIsAdmin && (
                                            <FakeLink onClick={handleNewEventClick}>
                                                <StyledPlus /> Opprett hendelse
                                            </FakeLink>
                                        )}
                                        {userIsStation && (
                                            <FakeLink onClick={handleNewPickUpClick}>
                                                <StyledPlus /> Utlys ekstrauttak
                                            </FakeLink>
                                        )}
                                    </Links>
                                    <LogoWrapper>
                                        <Logo />
                                    </LogoWrapper>
                                </>
                            )}
                        </Transition>
                    </Padding>
                </Wrapper>
            )}
        </Transition>
    );
};
