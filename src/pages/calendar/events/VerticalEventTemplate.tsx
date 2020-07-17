import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../../types';
import { Edit } from '@styled-icons/material/Edit';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;
    background-color: ${Colors.LightBeige};
`;

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

interface VerticalEventTemplateProps {
    children: React.ReactNode;
    title: string;
    showEditSymbol: boolean;
    isEditing: boolean;
    onEditClick?: () => void;
}

/**
 * General event component template
 */
export const VerticalEventTemplate: React.FC<VerticalEventTemplateProps> = (props) => (
    <Wrapper>
        <Title>
            <h2>{props.title}</h2>
            {props.isEditing || !props.showEditSymbol ? null : (
                <EditTitle>
                    <Edit size="1em" onClick={props.onEditClick} />
                </EditTitle>
            )}
        </Title>
        {props.children}
    </Wrapper>
);
