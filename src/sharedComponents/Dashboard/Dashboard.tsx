import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { SideBar } from './SideBar';
import { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const Body = styled.div`
    height: Calc(100% - 125px);
    display: flex;
    position: relative;
`;

const Page = styled.div`
    flex: 1;
`;

interface DashboardProps {
    children: React.ReactNode;
}

/**
 * Component that wraps around the page components.
 * It's the general portal wrapper, with navigation and such.
 */
export const Dashboard: React.FC<DashboardProps> = (props) => {
    // State for if the side navigation is visible
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    // Function to toggle the side navigation
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const closeSideBar = () => {
        setIsSidebarVisible(false);
    };

    return (
        <Wrapper>
            <Header isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <Body>
                <Page>{props.children}</Page>
                <SideBar isVisible={isSidebarVisible} onClick={closeSideBar} />
            </Body>
        </Wrapper>
    );
};
