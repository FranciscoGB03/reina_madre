import {API} from './axios';
import {cargando} from "../services/swalService";
import {mostrarErrorGuardar, returnCargadoCorrecto} from "./responses";

const ruta_base = "productos/";

export const getCategoria = (uuid, mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getCategoria`, {uuid})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getCategorias = (mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getCategorias`, {})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getInfoParaCarrito = (items_carrito, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getInfoParaCarrito`, {items_carrito})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getPacks = (mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getPacks`, {})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getPack = (key, uuid, relaciones, mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getPack/${key}`, {uuid, relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getPresentaciones = (mostrar_cargando = false, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getPresentaciones`, {})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
