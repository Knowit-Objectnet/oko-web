import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MessageBox } from './MessageBox';
import { Edit } from '@styled-icons/material/Edit';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { LocationOn } from '@styled-icons/material/LocationOn';
import { Truck } from '@styled-icons/fa-solid/Truck';
import { WeightHanging } from '@styled-icons/fa-solid/WeightHanging';
import { eventInfo } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 50px;
`;

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

const Body = styled.div`
    display: flex;
    flex-direction: row;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Option = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 42px;
`;

const OptionInfo = styled.div`
    margin-left: 36px;
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

const Submission = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const Button = styled.button`
    background-color: ${(props) => props.color};
    border-radius: 5px;
    border: none;
    width: 108px;
    height: 47px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 13px;
    color: #000000;
`;

export const Event: React.FC<eventInfo> = (props) => {
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
            <Title>
                <TitleInput
                    name="titleInput"
                    value={title}
                    onChange={onChange}
                    readOnly={!isEditing}
                    disabled={!isEditing}
                />
                {isEditing ? null : (
                    <EditTitle>
                        <Edit size="1em" onClick={onEditClick} />
                    </EditTitle>
                )}
            </Title>
            <Body>
                <Options>
                    <Option>
                        <Clock size="1.5em" />
                        <OptionInfo>
                            {`
                            ${props.start.toLocaleString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })},
                            ${props.start.getHours()} - 
                            ${props.end.getHours()}
                        `}
                        </OptionInfo>
                    </Option>
                    <Option>
                        <LocationOn size="1.5em" />
                        <OptionInfo>
                            <GrayBox>
                                {props.resource && props.resource.location
                                    ? props.resource.location.toUpperCase()
                                    : null}
                            </GrayBox>
                        </OptionInfo>
                    </Option>
                    <Option>
                        <Truck size="1.5em" />
                        <OptionInfo>
                            <GrayBox>
                                {props.resource && props.resource.driver
                                    ? props.resource.driver.charAt(0).toUpperCase() + props.resource.driver.slice(1)
                                    : null}
                            </GrayBox>
                        </OptionInfo>
                    </Option>
                    <Option>
                        <WeightHanging size="1.5em" />
                        <OptionInfo>
                            <GrayBox>{props.resource ? props.resource.weight : null}</GrayBox>
                        </OptionInfo>
                    </Option>
                </Options>
                {props.resource && props.resource.message ? <MessageBox {...props.resource.message} /> : null}
            </Body>
            {isEditing ? (
                <Submission>
                    <Button color="#EC7070" name="cancelButton" onClick={onClick}>
                        Avbryt
                    </Button>
                    <Button color="#52CC91" name="submitButton" onClick={onClick}>
                        Godkjenn
                    </Button>
                </Submission>
            ) : null}
        </Wrapper>
    );
};
