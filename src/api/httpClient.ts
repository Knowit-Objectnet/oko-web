import axios, { AxiosInstance } from 'axios';

export const httpClient = (token?: string): AxiosInstance => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        responseType: 'json',
    });
};
