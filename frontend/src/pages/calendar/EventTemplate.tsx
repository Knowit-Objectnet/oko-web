import * as React from 'react';
import styled from 'styled-components';
import { EventTitle } from './EventTitle';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 50px;
`;

interface EventTemplateProps {
    children: React.ReactNode;
    title: string;
    showEditSymbol: boolean;
    isEditing: boolean;
    onEditClick?: () => void;
}

export const EventTemplate: React.FC<EventTemplateProps> = (props) => (
    <Wrapper>
        <EventTitle
            title={props.title}
            isEditing={props.isEditing}
            editable={props.showEditSymbol}
            onEditClick={props.onEditClick}
        />
        {props.children}
    </Wrapper>
);
