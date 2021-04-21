import * as React from 'react';
import styled from 'styled-components';
import DotsSpinner from '../assets/DotsSpinner.svg';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledSpinner = styled(DotsSpinner)`
    flex-grow: 0;
    height: 0.375rem;
    width: auto;
`;

export const Spinner: React.FC = () => (
    <Wrapper>
        <StyledSpinner />
    </Wrapper>
);
