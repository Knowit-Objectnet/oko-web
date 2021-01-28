import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { SideBar } from './SideBar';
import { useState } from 'react';
import { PageRouter } from '../../router/PageRouter';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const Body = styled.div`
    height: Calc(100% - 125px);
    display: flex;
    position: relative;
    overflow: hidden;
`;

const Page = styled.main`
    flex: 1;
    overflow-y: auto;
`;

/**
 * Component that wraps around the page components.
 * It's the general portal wrapper, with navigation and such.
 */
export const Dashboard: React.FC = () => {
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
                <Page>
                    <PageRouter />
                </Page>
                <SideBar isVisible={isSidebarVisible} onClick={closeSideBar} />
            </Body>
        </Wrapper>
    );
};
