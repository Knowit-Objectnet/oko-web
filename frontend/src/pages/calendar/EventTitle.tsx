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

const TitleInput = styled.input`
    width: fit-content(5px);
    border: none;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 29px;
    line-height: 34px;

    color: #000000;

    &:disabled {
        background-color: transparent;
    }
`;

const EditTitle = styled.div`
    display: flex;
    justify-content: flex-start;
`;

interface EventTitleProps {
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean;
    onEditClick: () => void;
}

export const EventTitle: React.FC<EventTitleProps> = (props) => (
    <Title>
        <TitleInput
            name="titleInput"
            value={props.title}
            onChange={props.onChange}
            readOnly={!props.isEditing}
            disabled={!props.isEditing}
        />
        {props.isEditing ? null : (
            <EditTitle>
                <Edit size="1em" onClick={props.onEditClick} />
            </EditTitle>
        )}
    </Title>
);
