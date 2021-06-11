import * as React from 'react';
import styled from 'styled-components';
import Person from '../../../assets/Person.svg';
import Phone from '../../../assets/Phone.svg';
import Mail from '../../../assets/Mail.svg';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 2px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 10px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 15px;
    box-sizing: border-box;
    flex: 1;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    &:first-child {
        margin-bottom: 10px;
    }
`;

const Cell = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    margin-right: 10px;
`;

const StyledPerson = styled(Person)`
    height: 1.5em;
`;

const StyledPhone = styled(Phone)`
    height: 1.5em;
`;

const StyledMail = styled(Mail)`
    height: 1.5em;
`;

interface StationAddressProps {
    name: string;
    phone: string;
    email: string;
    title: string;
}

export const StationAmbassador: React.FC<StationAddressProps> = (props) => {
    return (
        <Wrapper>
            <Title>Hovedkontakt:</Title>
            <Info>
                <Row>
                    <Cell>
                        <Icon>
                            <StyledPerson />
                        </Icon>
                        {props.name}
                    </Cell>
                    <Cell>
                        <Icon>
                            <StyledMail />
                        </Icon>
                        {props.email}
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Icon>
                            <StyledPhone />
                        </Icon>
                        {props.phone}
                    </Cell>
                    <Cell>{props.title}</Cell>
                </Row>
            </Info>
        </Wrapper>
    );
};
