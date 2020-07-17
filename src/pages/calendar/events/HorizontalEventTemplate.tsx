import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../types';
import {Edit} from "@styled-icons/material/Edit";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${Colors.White};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${Colors.LightBeige};
    padding: 0px 20px;
    margin-bottom: 25px;
`;

const EditTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
`;

const Body = styled.div`
    padding: 0px 25px 25px 25px;
`;

interface HorizontalEventTemplateProps {
    children: React.ReactNode;
    title: string;
    showEditSymbol: boolean;
    isEditing: boolean;
    onEditClick?: () => void;
}

/**
 * General event component template
 */
export const HorizontalEventTemplate: React.FC<HorizontalEventTemplateProps> = (props) => (
    <Wrapper>
        <Title>
            <h2>{props.title}</h2>
            {props.isEditing || !props.showEditSymbol ? null : (
                <EditTitle>
                    <Edit size="1em" onClick={props.onEditClick} />
                </EditTitle>
            )}
        </Title>
        <Body>
            {props.children}
        </Body>
    </Wrapper>
);
