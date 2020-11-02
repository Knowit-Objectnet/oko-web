import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useAlert, types } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import useStations from '../api/hooks/useStations';
import { queryCache, useMutation } from 'react-query';
import { deleteStation, stationsDefaultQueryKey } from '../api/StationService';
import { Button } from './Button';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 10px 20px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    box-sizing: border-box;
`;

const Form = styled.form`
    padding: 0 35px 35px;
    display: flex;
    flex-direction: column;
`;

const Select = styled.select`
    width: 100%;
    min-width: 250px;
    height: 30px;
    margin-bottom: 10px;
`;

interface DeleteStationProps {
    afterSubmit?: (successful: boolean) => void;
}

export const DeleteStation: React.FC<DeleteStationProps> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const { data: stations, isLoading: stationsLoading, isError: stationsError } = useStations();
    const [deleteStationMutation, { isLoading: deleteStationLoading }] = useMutation(
        async (stationId: number) => {
            await deleteStation(stationId, keycloak.token);
        },
        {
            onSuccess: () => {
                alert.show('Stasjonen ble slettet suksessfullt.', { type: types.SUCCESS });
                props.afterSubmit?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, stasjonen ble ikke slettet.', { type: types.ERROR });
                props.afterSubmit?.(false);
            },
            onSettled: () => {
                queryCache.invalidateQueries(stationsDefaultQueryKey);
            },
        },
    );

    const [selectedStationId, setSelectedStationId] = useState<number>();

    const handleStationSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.persist();
        setSelectedStationId(parseInt(event.currentTarget.value));
    };

    const handleDeleteStationSubmission = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!selectedStationId) {
            alert.show('Vennligst velg en stasjon.', { type: types.ERROR });
            return;
        }
        await deleteStationMutation(selectedStationId);
    };

    return (
        <Wrapper>
            <Title>Slett stasjon</Title>
            <Form onSubmit={handleDeleteStationSubmission}>
                <Select onChange={handleStationSelectionChange} disabled={stationsLoading || stationsError}>
                    <option value="default" disabled selected>
                        {(stationsLoading && 'Laster inn...') ||
                            (stationsError && 'Kunne ikke laste stasjoner') ||
                            'Velg stasjon'}
                    </option>
                    {stations?.map((station) => (
                        <option value={station.id} key={station.id}>
                            {station.name}
                        </option>
                    ))}
                </Select>
                <Button text="Slett" type="submit" loading={deleteStationLoading} color="Red" />
            </Form>
        </Wrapper>
    );
};
