import {useStore} from "../index";
import {getMiPerfil} from "../api/usuariosApi";
import {getUID} from "../services/jwtService";
import {isLogged} from "../services/authService";
import {getAccessToken} from "../services/seguridad.service";

export const limpiaSeleccionado = () => useStore.setState(s => ({seleccionado: {}}));
export const setSeleccionado = (nuevo) => useStore.setState(s => ({seleccionado: {...s.seleccionado, ...nuevo}}));
export const nuevoSeleccionado=()=>{
    useStore.setState(s=>s.seleccionado=null);
}

export const cargarUsuario = () => {
    if (isLogged()) {
        getMiPerfil(getUID(getAccessToken()), ['info_personal'], false, false).then(res => {
            let usuario = {
                id:res.id,
                nombre: res.info_personal.full_name,
                email: res.email
            };
            useStore.setState(s => ({usuario: usuario}))
        });
    }
}

