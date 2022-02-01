import {BiCategory} from "react-icons/bi";
import {sch_nombre} from "../../../validators";

export const departamento={
    campos: [
        {
            buscador_key: 'nombre',
            display: 'nombre',
            form_ver: true,
            form_tipo: 'text',
            key: 'nombre',
            label: 'catalogos:nombre',
            max_length: 250,
            show_buscador: true,
            show_sort: true,
            sort_key: 'nombre',
            ver_en_tabla: true
        },
        {
            buscador_key: 'activo',
            display: 'activo',
            form_ver: true,
            form_tipo: 'check',
            key: 'activo',
            label: 'catalogos:activo',
            show_buscador: false,
            show_sort: true,
            sort_key: 'activo',
            ver_en_tabla: true
        }
    ],
    cats: [],
    cl_requerido:false,
    eliminar: false,
    key: 'departamento',
    label_s: 'catalogos:departamento',
    label_p: 'catalogos:departamentos',
    icon: BiCategory,
    permiso_guardar: 'catalogos.guardar_catalogo',
    permiso_ver: 'catalogos.ver_catalogos',
    schema: sch_nombre
}