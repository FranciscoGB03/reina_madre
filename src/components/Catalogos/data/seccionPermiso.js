import {ImUserTie} from "react-icons/im";
import {sch_nombre} from "../../../validators";

export const seccion_permiso = {
    campos: [
        {
            buscador_key: 'nombre',
            display: 'nombre',
            form_ver: true,
            form_tipo: 'text',
            key: 'nombre',
            label: 'catalogos:nombre',
            max_length: 50,
            show_buscador: true,
            show_sort: true,
            sort_key: 'nombre',
            ver_en_tabla: true
        }
    ],
    cats: [],
    cl_requerido: false,
    eliminar: false,
    key: 'seccion_permiso',
    label_s: 'catalogos:seccionPermiso',
    label_p: 'catalogos:seccionesPermiso',
    icon: ImUserTie,
    permiso_guardar: 'catalogos.guardar_catalogo',
    permiso_ver: 'catalogos.ver_catalogos',
    schema: sch_nombre
}
