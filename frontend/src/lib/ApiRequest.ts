// src/lib/apiRequest.ts
import type { AxiosError, Method } from 'axios';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.utilitypackage.it.kr',
    // baseURL: 'http://58.140.228.150',
    // baseURL: 'http://127.0.0.1:9080',
    timeout: 100000, // 100초
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        const isFormData = data instanceof FormData;

        const response = await api.request<{ success: boolean; statusCode: number; data: T;}>
        ({ method, url, params, data, headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }, });

        const resData = response.data;

        if (resData.success && resData.statusCode === 200) {
            onSuccess?.(resData.data);
            return resData.data;
        }
        else {
            const err = {
                message: 'API returned unsuccessful response',
                response: { data: resData, status: resData.statusCode, },
                isCustomHandled: true,
            } as unknown as AxiosError;
            onError?.(err);
            return undefined;
        }
    }
    catch (error) {
        const err = error as AxiosError;
        console.error('[API ERROR]', err.response?.data || err.message);
        onError?.(err);
        return undefined;
    }
};


export default apiRequest;
