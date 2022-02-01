import {cargando, cerrarAlert} from "./swalService";
import {API} from "../api/axios";
import i18next from 'i18next';
import {ocultableDanger} from "./swalService";
import {setAccessToken, setEncKey, setRefreshToken} from "./seguridad.service";
import {getLS, limpiarLs} from './localStorageService';
import {useStore} from "../index";
import {cifraString} from "./generalService";

export const attempt = (email, password) => {
    cargando();
    return API.post('/login/attempt', {email: cifraString(email), password: cifraString(password)})
        .then((res) => {
            console.log(res);
            setEncKey(res.data.enc_key);
            setRefreshToken(res.data.refresh_token);
            setAccessToken(res.data.access_token);
            cerrarAlert();
            useStore.getState().cargaPermisos();
            // if (res.status === 200)
            //     window.location.href = '/';
            return res.data;
        }).catch(err => {
            cerrarAlert();
            console.log(err.response);
            switch (err.response.status) {
                case 403:
                    ocultableDanger(i18next.t('error:credencialesIncorrectas'), i18next.t('auth:errorAuth'));
                    break;
                case 500:
                default:
                    ocultableDanger(err, i18next.t('auth:errorAuth'));
                    break;
            }
            return err.response;
        });
};

export const isLogged = () => {
    let token = getLS('access_token');
    return typeof token !== 'undefined' && token !== null;
};

export const logout = () => {
    limpiarLs('access_token');
    limpiarLs('refresh_token');
    //limpiarLs('carrito');
    //limpiarLs('envio_gratis');

    useStore.getState().limpiaStore();
    setTimeout(() => {
        useStore.getState().controla();
        window.location.href = process.env.REACT_APP_BASE_NAME;
    }, 1000);
};
