import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '../types';

export const httpClient = (token?: string): AxiosInstance => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: 'json',
    });
};
