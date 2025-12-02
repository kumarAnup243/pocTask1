import axios from 'axios';
import api from '../services/api';

jest.mock('axios', () => {
    const mAxios = {
        create: jest.fn(() => mAxios),
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() },
        },
    };
    return mAxios;
});

describe('api service', () => {
    test('creates axios instance with correct base URL and headers', () => {
        expect(axios.create).toHaveBeenCalledWith({
            baseURL: 'http://localhost:8080/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    test('attaches request and response interceptors', () => {
        expect(api.interceptors.request.use).toHaveBeenCalled();
        expect(api.interceptors.response.use).toHaveBeenCalled();
    });

    test('request interceptor returns config', () => {
        const requestInterceptor = api.interceptors.request.use.mock.calls[0][0];
        const config = { headers: {} };
        const result = requestInterceptor(config);
        expect(result).toBe(config);
    });

    test('request interceptor handles error', async () => {
        const requestErrorInterceptor = api.interceptors.request.use.mock.calls[0][1];
        const error = new Error('Request Error');
        await expect(requestErrorInterceptor(error)).rejects.toThrow('Request Error');
    });

    test('response interceptor returns response', () => {
        const responseInterceptor = api.interceptors.response.use.mock.calls[0][0];
        const response = { data: 'test' };
        const result = responseInterceptor(response);
        expect(result).toBe(response);
    });

    test('response interceptor handles error', async () => {
        const responseErrorInterceptor = api.interceptors.response.use.mock.calls[0][1];
        const error = new Error('Response Error');
        await expect(responseErrorInterceptor(error)).rejects.toThrow('Response Error');
    });
});
