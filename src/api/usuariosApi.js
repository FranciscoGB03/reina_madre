import {API} from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorGuardar} from "./responses";

const ruta_base = "usuarios/";

export const activaCuenta = (hash, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}activarCuenta`, {hash})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const activarUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}actualizar`, {usuario_id, info_actualizar: {estatus: 'ACT'}})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const actualiza = (usuario_id, info_actualizar, info_personal, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}actualizar`, {usuario_id, info_actualizar, info_personal})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const cambiarPassword = (usuario_id, password, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}cambiarPassword`, {usuario_id, password})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const consultaUsuarios = (order = {id: 'asc'}, filtros = [], pagina = 1, rows = 20, relaciones = [], mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}consultar`, {order, filtros, pagina, rows, relaciones})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const eliminaUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}eliminarUsuario`, {usuario_id})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const getAllUsuarios = (mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getAllUsuarios`, {})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getDirecciones = (mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getDirecciones`, {})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getMiPerfil = (usuario_id_e, relaciones = [], mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getMiPerfil`, {usuario_id_e, relaciones})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const guardaDireccion = (usuario_id_e, direccion, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}${usuario_id_e === null ? 'guardarDireccionAnonimo' : 'guardarDireccion'}`, {
        usuario_id_e,
        direccion
    })
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const inactivarUsuario = (usuario_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}actualizar`, {usuario_id, info_actualizar: {estatus: 'INA'}})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const restablecePassword = (hash, nuevo_password, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}restablecerPassword`, {hash, nuevo_password})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const registraUsuario = (usuario, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}registrarUsuario`, {usuario})
        .then(res => res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const validaHash = (hash, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}validarHash`, {hash})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const recuperaPassword = (email, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}olvidePassword`, {email})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
}

export const actualizaFotoPerfil = (info_personal_id, foto_uuid, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}actualizarFotoPerfil`, {info_personal_id: info_personal_id, foto_uuid: foto_uuid})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
}
