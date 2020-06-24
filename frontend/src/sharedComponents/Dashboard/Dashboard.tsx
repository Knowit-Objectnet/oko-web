import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const Body = styled.div`
    height: Calc(100% - 125px);
`;

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
