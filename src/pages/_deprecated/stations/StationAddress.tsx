import * as React from 'react';
import styled from 'styled-components';
import Location from '../../../assets/Location.svg';

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
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 15px;
    box-sizing: border-box;
    flex: 1;
`;

const StyledLocation = styled(Location)`
    height: 1.5em;
    margin-right: 10px;
`;

interface StationAddressProps {
    address: string;
}

export const StationAddress: React.FC<StationAddressProps> = (props) => {
    return (
        <Wrapper>
            <Title>Addresse:</Title>
            <Info>
                <StyledLocation />
                {props.address}
            </Info>
        </Wrapper>
    );
};
