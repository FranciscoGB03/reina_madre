import {mostrarErrorGuardar, returnGuardadoCorrecto} from "./responses";
import {cargando} from "../services/swalService";
import {API} from "./axios";

const ruta_base = `${process.env.REACT_APP_URL_API}/adjuntos`;

export const guardarContratoPropiedad = (propiedad_id, contrato, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    mostrar_cargando && cargando();
    let formData = new FormData();
    contrato.forEach((file, idx) => {
        formData.append(`adjuntos[${idx}]`, file);
    });
    formData.append('propiedad_id', propiedad_id);
    return API.post(`${ruta_base}/guardarContratoPropiedad`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => mostrar_cargado && returnGuardadoCorrecto(res.data))
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
