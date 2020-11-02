import * as React from 'react';
import styled from 'styled-components';
import Pencil from '../../assets/Pencil.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.White};
    overflow: visible;
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 0 20px;
    box-sizing: border-box;
`;

const EditTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
`;

const Body = styled.div`
    padding: 25px;
`;

interface HorizontalEventTemplateProps {
    children: React.ReactNode;
    title: string;
    hideTitleBar?: boolean;
    showEditSymbol: boolean;
    isEditing: boolean;
    onEditClick?: () => void;
}

/**
 * General event component template
 */
export const EventTemplateHorizontal: React.FC<HorizontalEventTemplateProps> = (props) => (
    <Wrapper>
        {!props.hideTitleBar && (
            <Title>
                <h2>{props.title}</h2>
                {!props.isEditing && props.showEditSymbol && (
                    <EditTitle>
                        <Pencil height="1em" onClick={props.onEditClick} />
                    </EditTitle>
                )}
            </Title>
        )}
        <Body>{props.children}</Body>
    </Wrapper>
);
