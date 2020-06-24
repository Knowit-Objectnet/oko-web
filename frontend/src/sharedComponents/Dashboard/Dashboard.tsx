import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const Wrapper = styled.div``;

const Body = styled.div``;

interface DashboardProps {
    children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
        <Wrapper>
            <Header />
            <Body>{props.children}</Body>
        </Wrapper>
    );
};
