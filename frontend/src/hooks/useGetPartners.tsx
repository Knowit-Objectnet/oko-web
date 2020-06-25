import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import {useGetFetchAPI} from "./useGetFetchAPI";

export const useGetPartners: () => Array<string> = () => {
    return useGetFetchAPI<string>('/api/partners');
};
