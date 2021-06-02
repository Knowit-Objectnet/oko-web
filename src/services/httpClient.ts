import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
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

export const extractResponse = <TData>(response: AxiosResponse<TData>): TData => response.data;

export interface ApiError {
    /** HTTP return code **/
    code?: string;
    name: string;
    message: string;
}

export const transformError = ({ code, name, message, response }: AxiosError) => {
    // TODO: generate better error message here
    throw {
        code,
        name,
        message: `Feil fra API: ${message}, ${response}`,
    };
};
