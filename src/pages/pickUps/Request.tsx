import * as React from 'react';
import styled from 'styled-components';
import { ApiPartner } from '../../types';
import { Button } from '../../sharedComponents/Button';

const Partner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 5px;
    box-sizing: border-box;

    &:not(:last-child) {
        border-bottom: 2px solid ${(props) => props.theme.colors.White};
    }
`;

const PartnerName = styled.div`
    font-weight: bold;
`;

const Selection = styled.div`
    display: flex;
`;

const Reject = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`;

interface StatusProps {
    approved: boolean;
}

const Status = styled.div<StatusProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 90px;
    height: 22px;
    background-color: ${(props) => (props.approved ? props.theme.colors.Green : props.theme.colors.Red)};
    font-weight: bold;
    font-size: 12px;
`;

const Waiting = styled.div`
    font-style: italic;
    font-size: 12px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

interface RequestProps {
    pickupId: number;
    partner: ApiPartner;
    selectedId?: number;
    isStation: boolean;
    onReject: (partner: ApiPartner, pickupId: number) => void;
    onApprove: (partner: ApiPartner, pickupId: number) => void;
}

export const Request: React.FC<RequestProps> = (props) => {
    // Function to handle the rejection of a request
    // TODO: Currently not used as backend doesnt support it
    const onReject = () => {
        props.onApprove(props.partner, props.pickupId);
    };

    // Function to handle the approval of a request
    const onApprove = () => {
        props.onApprove(props.partner, props.pickupId);
    };

    return (
        <Partner>
            <PartnerName>{props.partner.name}</PartnerName>
            {props.isStation && !props.selectedId ? (
                <Selection>
                    {/*
                        <Reject onClick={onReject}>
                            <Cross height="1em" /> Avvis
                        </Reject>
                    */}
                    <Button text="Godkjenn" color="Green" height={22} onClick={onApprove} />
                </Selection>
            ) : props.selectedId ? (
                <Status approved={props.partner.id === props.selectedId}>
                    {props.partner.id === props.selectedId ? 'Godkjent' : 'Avvist'}
                </Status>
            ) : (
                <Waiting>Avventer svar</Waiting>
            )}
        </Partner>
    );
};
