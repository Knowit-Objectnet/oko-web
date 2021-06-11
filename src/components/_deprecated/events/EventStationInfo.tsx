import * as React from 'react';
import styled from 'styled-components';
import LocationIcon from '../../../assets/Location.svg';
import { ApiStation } from '../../../services/deprecated/StationService';

const Box = styled.div`
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 0 3rem;
    height: 3rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled(LocationIcon)`
    margin-right: 0.75rem;
    height: 2rem;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 0.75rem;
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
