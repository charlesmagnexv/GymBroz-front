import axios from 'axios'
import Cookies from 'js-cookie';
import { refreshToken } from '../auth.service';

const Api = axios.create({
    baseURL: "https://gymbro-apy.onrender.com/api/v1",
})

Api.interceptors.request.use((config) => {
    const token = Cookies.get('acessToken') || '';
    const isAuthenticationRequest = config.url?.startsWith('/auth')

    if (!isAuthenticationRequest && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const resp = await refreshToken()
                Cookies.set("acessToken", resp.data.acessToken, { secure: true, sameSite: 'strict' });
                Cookies.set("refreshToken", resp.data.newRefreshToken, { secure: true, sameSite: 'strict' });
                return Api(originalRequest);
            } catch (e) {
                Cookies.remove("acessToken")
                Cookies.remove("refreshToken")
                return Promise.reject(error);
            }
        }
    }
);

export default Api;