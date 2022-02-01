import {API} from './axios';
import { returnCargadoCorrecto, mostrarErrorCargar} from "./responses";
import {cargando} from "../services/swalService";

const ruta_base = "admin/";
export const guardarRolUsuarios = (rol,mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}guardarRolUsuarios`, {rol: rol})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardarRolPermisos = (rol,mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}guardarRolPermisos`, {rol: rol})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
