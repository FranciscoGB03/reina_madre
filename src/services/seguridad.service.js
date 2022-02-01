import Cookies from 'universal-cookie';
import Aes from "crypto-js/aes";
import UTF8 from "crypto-js/enc-utf8";
import {getLS, setLS} from "./localStorageService";
import {esToken, getUID} from "./jwtService";
import moment from "moment";
import {API} from "../api/axios";
import {useStore} from "../index";

const cookies = new Cookies();
export const cargarConfiguraciones = () => {
    API.post('admin/getConfiguracionesActivas').then((res) => {
        let data = {};
        (res?.data || []).forEach(config => {
            data[config.nombre] = config.valor;
        });
        useStore.setState({configuraciones: data});
        useStore.getState().controla();
    });
};
export const cargarPermisos = () => {
    if (!sesionIniciada())
        useStore.setState({permisos: []});
    const username_id = getUID(getAccessToken());
    if (username_id == null || username_id.length === 0) {
        useStore.setState({permisos: []});
        useStore.getState().controla();
    } else
        API.post('seguridad/getPermisos').then((res) => {
            console.log(res.data);
            let data = (res?.data || []).map(permiso => `${permiso?.seccion_permiso?.nombre}.${permiso.nombre}`);
            console.log(data);
            useStore.setState({permisos: data});
            useStore.getState().controla();
            //useStore.getState().cargaUsuario();
        });
};

export const permisosCargados = (permisos) => permisos != null;

export const can = (permiso) => {
    const permisos = useStore.getState().permisos;
    return (permisos || []).indexOf(permiso) >= 0;
}


export const getAccessToken = () => {
    const token_encriptado = getLS('access_token');
    if (token_encriptado === "")
        return "";
    try {
        const cookies = new Cookies();
        const enc_key = cookies.get('enc_key');
        const token = Aes.decrypt(token_encriptado, enc_key).toString(UTF8);
        return token;
    } catch (err) {
        return "";
    }
}

export const setEncKey = enc_key => cookies.set('enc_key', enc_key, {
    path: '/',
    expires: moment().add(90, 'days').toDate()
});

export const setRefreshToken = refresh_token => cookies.set('refresh_token', refresh_token, {
    path: '/',
    expires: moment().add(90, 'days').toDate()
});

export const setAccessToken = (plain_token) => setLS('access_token', Aes.encrypt(plain_token, cookies.get('enc_key')).toString());

export const sesionIniciada = () => {
    let token = getAccessToken();
    return token != null && esToken(token);
}
