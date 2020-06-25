import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import {useGetFetchAPI} from "./useGetFetchAPI";

export const useGetNotifications: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/notifications');
};
