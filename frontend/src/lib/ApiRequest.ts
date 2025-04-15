// src/lib/apiRequest.ts
import api from '@/lib/axios';
import type { AxiosError, Method } from 'axios';

interface ApiRequestOptions<T = any> {
    method: Method;
    url: string;
    data?: any;
    params?: Record<string, any>;
    onSuccess?: (response: T) => void;
    onError?: (error: AxiosError) => void;
}

const apiRequest = async <T = any>({ method, url, data, params, onSuccess, onError, }: ApiRequestOptions<T>): Promise<T | undefined> => {
    try {
        const response = await api.request<T>({ method, url, data, params });
        onSuccess?.(response.data);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('[API ERROR]', err.response?.data || err.message);
        onError?.(err);
        return undefined;
    }
};

export default apiRequest;
