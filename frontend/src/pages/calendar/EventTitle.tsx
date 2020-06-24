import * as React from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/material/Edit';

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: solid 1px black;
    margin-bottom: 32px;
`;

const EditTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
`;

interface EventTitleProps {
    title: string;
    isEditing: boolean;
    editable: boolean;
    onEditClick?: () => void;
}

export const EventTitle: React.FC<EventTitleProps> = (props) => (
    <Title>
        <h2>{props.title}</h2>
        {props.isEditing || !props.editable ? null : (
            <EditTitle>
                <Edit size="1em" onClick={props.onEditClick} />
            </EditTitle>
        )}
    </Title>
);
