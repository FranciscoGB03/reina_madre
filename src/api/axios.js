import axios from 'axios';
import {getAccessToken, setAccessToken} from "../services/seguridad.service";
import Cookies from 'universal-cookie';
import {isLogged, logout} from "../services/authService";

let instance = axios.create(
    {
        baseURL: `${process.env.REACT_APP_URL_API}/`
    }
);

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});


instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!isLogged())
        return new Promise((resolve, reject) => void (reject(error)));
    else {
        const originalReq = error.config;
        if (error.response.status !== 401 && error.response.status !== 403)
            return new Promise((resolve, reject) => void (reject(error)));
        if (error.config.url === '/renuevaAccessToken' || error.config.url === '/login/attempt') {
            //logout();
            return new Promise((resolve, reject) => void (reject(error)));
        }
        const cookies = new Cookies();
        const refresh_token = cookies.get('refresh_token');
        originalReq._retry = true;
        return axios.post(`${process.env.REACT_APP_URL_API}/renuevaAccessToken`, {refresh_token})
            .then(res => {
                setAccessToken(res.data.access_token)
                originalReq.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                return axios(originalReq);
            }).catch(error => {
                logout();
                Promise.reject(error);
            });
    }
});
export const API = instance;
