import * as React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';
import { Flex } from '@chakra-ui/react';

const Wrapper: React.FC = (props) => (
    <Flex flexDirection={{ base: 'column-reverse', sm: 'column' }} height="100%" width="100%" {...props} />
);

const Body = styled.div`
    height: 100%;
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
