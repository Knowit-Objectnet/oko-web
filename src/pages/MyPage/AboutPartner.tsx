import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 350px;
    margin-bottom: 45px;
`;

const Title = styled.p`
    font-weight: bold;
    margin-top: 0px;
`;

const Text = styled.p`
    font-size: 14px;
`;

interface AboutPartnerProps {
    name: string;
    description: string;
}

/**
 * Share Contact info component
 */
export const AboutPartner: React.FC<AboutPartnerProps> = (props) => (
    <Wrapper>
        <Title>Om {props.name}</Title>
        <Text>{props.description}</Text>
    </Wrapper>
);
