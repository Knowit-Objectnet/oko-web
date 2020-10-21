import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '../types';

export const apiClient = (token?: string): AxiosInstance => {
    // TODO: add all default headers here
    return axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: 'json',
    });
};
