import * as React from 'react';
import styled from 'styled-components';
import { TopBar } from './TopBar';
import { Navigation } from './Navigation';

const StyledHeader = styled.header`
    width: 100%;
    height: 125px;
`;

export const Header: React.FC<unknown> = () => {
    return (
        <StyledHeader>
            <TopBar />
            <Navigation />
        </StyledHeader>
    );
};
