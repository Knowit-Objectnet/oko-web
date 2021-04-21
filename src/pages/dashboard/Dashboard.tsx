import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';

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

export const Dashboard: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <Body>
                <Page>
                    <PageRouter />
                </Page>
            </Body>
        </Wrapper>
    );
};
