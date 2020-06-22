import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { EventTitle } from './EventTitle';
import { EventOption } from './EventOption';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventSubmission } from './EventSubmission';
import { LocationOn } from '@styled-icons/material/LocationOn';
import { Truck } from '@styled-icons/fa-solid/Truck';
import { WeightHanging } from '@styled-icons/fa-solid/WeightHanging';
import { EventInfo } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 50px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const GrayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
`;

export const Event: React.FC<EventInfo> = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.title);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        switch (e.currentTarget.name) {
            case 'titleInput': {
                setTitle(e.currentTarget.value);
                break;
            }
        }
    };

    const onEditClick = () => {
        onEdit();
    };

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.persist();
        switch (e.currentTarget.name) {
            case 'cancelButton': {
                onCancel();
                break;
            }
            case 'submitButton': {
                onSubmit();
                break;
            }
        }
    };

    const onEdit = () => {
        setIsEditing(true);
    };

    const onCancel = () => {
        setTitle(props.title);
        setIsEditing(false);
    };

    const onSubmit = () => {
        //TODO: Submit to server
        setIsEditing(false);
    };

    return (
        <Wrapper>
            <EventTitle title={props.title} onChange={onChange} isEditing={isEditing} onEditClick={onEditClick} />
            <Body>
                <Options>
                    <EventOptionDateRange start={props.start} end={props.end} />
                    <EventOption icon={LocationOn}>
                        <GrayBox>
                            {props.resource && props.resource.location ? props.resource.location.toUpperCase() : null}
                        </GrayBox>
                    </EventOption>
                    <EventOption icon={Truck}>
                        <GrayBox>
                            {props.resource && props.resource.driver
                                ? props.resource.driver.charAt(0).toUpperCase() + props.resource.driver.slice(1)
                                : null}
                        </GrayBox>
                    </EventOption>
                    <EventOption icon={WeightHanging}>
                        <GrayBox>{props.resource ? props.resource.weight : null}</GrayBox>
                    </EventOption>
                </Options>
                {props.resource && props.resource.message ? <MessageBox {...props.resource.message} /> : null}
            </Body>
            {isEditing ? <EventSubmission onSubmit={onClick} onCancel={onClick} /> : null}
        </Wrapper>
    );
};
