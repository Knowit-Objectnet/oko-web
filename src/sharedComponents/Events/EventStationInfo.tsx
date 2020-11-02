import * as React from 'react';
import styled from 'styled-components';
import LocationIcon from '../../assets/Location.svg';
import { ApiStation } from '../../api/StationService';

const Box = styled.div`
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 0 40px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled(LocationIcon)`
    margin-right: 15px;
    height: 2rem;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

interface Props {
    station: ApiStation;
}

export const EventStationInfo: React.FC<Props> = ({ station }) => (
    <Row>
        <Icon />
        <Box>{station.name}</Box>
    </Row>
);
