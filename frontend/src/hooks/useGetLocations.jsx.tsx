import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import {useGetFetchAPI} from "./useGetFetchAPI";

export const useGetLocations: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/locations');
};
