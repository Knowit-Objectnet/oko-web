import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    width: 200px;
    background-color: ${Colors.DarkBlue};
`;

/**
 * SideBar for the actual side menu
 */
export const SideBar: React.FC = () => {
    return <Wrapper></Wrapper>;
};
