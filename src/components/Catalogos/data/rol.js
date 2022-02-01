import {FaBook} from "react-icons/fa";
import {sch_nombre} from "../../../validators";

export const rol = {
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
    cl_requerido:false,
    eliminar: false,
    key: 'rol',
    label_s: 'catalogos:rol',
    label_p: 'catalogos:roles',
    icon: FaBook,
    permiso_guardar: 'catalogos.guardar_catalogo',
    permiso_ver: 'catalogos.ver_catalogos',
    schema: sch_nombre
}
