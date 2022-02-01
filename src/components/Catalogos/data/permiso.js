import {FaUserTie} from "react-icons/fa";
import {sch_permiso} from "../../../validators";

export const permiso = {
    campos: [
        {
            buscador_key: 'seccion_permiso.nombre',
            cat_key: 'seccion_permiso',
            display: 'seccion_permiso.nombre',
            form_ver: true,
            form_tipo: 'select',
            key: 'seccion_permiso',
            label: 'catalogos:seccionPermiso',
            show_buscador: true,
            show_sort: true,
            sort_key: 'seccion_permiso.nombre',
            ver_en_tabla: true
        }, {
            buscador_key: 'nombre',
            display: 'nombre',
            form_ver: true,
            form_tipo: 'text',
            key: 'nombre',
            label: 'catalogos:nombre',
            max_length: 80,
            show_buscador: true,
            show_sort: true,
            sort_key: 'nombre',
            ver_en_tabla: true
        }, {
            buscador_key: 'descripcion',
            display: 'descripcion',
            form_ver: true,
            form_tipo: 'text',
            key: 'descripcion',
            label: 'catalogos:descripcion',
            max_length: 100,
            show_buscador: true,
            show_sort: true,
            sort_key: 'descripcion',
            ver_en_tabla: true
        }
    ],
    cats: [{nombre: 'seccion_permiso', relaciones: []}],
    cl_requerido:false,
    eliminar: false,
    key: 'permiso',
    label_s: 'catalogos:permiso',
    label_p: 'catalogos:permisos',
    icon: FaUserTie,
    permiso_guardar: 'catalogos.guardar_catalogo',
    permiso_ver: 'catalogos.ver_catalogos',
    relaciones: ['seccion_permiso'],
    schema: sch_permiso
};
