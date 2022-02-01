import {cargando} from "../services/swalService";
import {API} from "./axios";
import {mostrarErrorGuardar, returnGuardadoCorrecto} from "./responses";

const ruta_base = "departamentoempresa/";

export const getDepartamentosEmpresas = (sort,filtros,pagina,rows,relaciones, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}consultar`, {sort,filtros,pagina,rows,relaciones})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};

export const guardarDepartamento = (rel_departamento_empresa, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}guardarDepartamentoEmpresa`, {rel_departamento_empresa})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};