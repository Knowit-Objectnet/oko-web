import axios, { AxiosInstance } from 'axios';
import keycloak from '../auth/keycloak';

export const httpClient = (): AxiosInstance =>
    axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
        },
        withCredentials: true,
        responseType: 'json',
    });
