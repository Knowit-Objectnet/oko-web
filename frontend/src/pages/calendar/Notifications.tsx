import * as React from 'react';
import styled from 'styled-components';
import { useGetNotifications } from '../../hooks/useGetNotifications';

const Wrapper = styled.div`
    background-color: #f2f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 110px;
`;

/**
 * Notifications component that displays notifications for the Partners and ambassadors.
 */
export const Notifications: React.FC<unknown> = () => {
    // Dummy data until backend service is up and running
    // TODO: Remove dummy data
    const dummyNotifications = ['Notification'];
    let notifications = useGetNotifications();
    notifications = notifications.length !== 0 ? notifications : dummyNotifications;

    return <Wrapper></Wrapper>;
};
