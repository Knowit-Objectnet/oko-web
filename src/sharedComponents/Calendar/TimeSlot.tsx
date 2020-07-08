import * as React from 'react';
import styled from 'styled-components';

const Slot = styled.div`
    flex: 1 0 0;
    border-top: 1px solid #f7f7f7;
`;

export const TimeSlot: React.FC = (props) => <Slot></Slot>;
