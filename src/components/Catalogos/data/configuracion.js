
import {sch_configuracion} from "../../../validators";
import {FaCogs} from "react-icons/fa";

export const configuracion = {
    campos: [
        {
            buscador_key: 'tipo_configuracion.nombre',
            cat_key: 'tipo_configuracion',
            display: 'tipo_configuracion.nombre',
            form_ver: true,
            form_tipo: 'select',
            key: 'tipo_configuracion',
            label: 'catalogos:tipoConfiguracion',
            show_buscador: true,
            show_sort: true,
            sort_key: 'tipo_configuracion.nombre',
            ver_en_tabla: true
        }, {
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
        }, {
            buscador_key: 'descripcion',
            display: 'descripcion',
            form_ver: true,
            form_tipo: 'text',
            key: 'descripcion',
            label: 'catalogos:descripcion',
            max_length: 250,
            show_buscador: true,
            show_sort: true,
            sort_key: 'descripcion',
            ver_en_tabla: true
        }, {
            buscador_key: 'valor',
            display: 'valor',
            form_ver: true,
            form_tipo: 'textarea',
            key: 'valor',
            label: 'catalogos:valor',
            max_length: 200,
            show_buscador: true,
            show_sort: true,
            sort_key: 'valor',
            ver_en_tabla: true
        }
    ],
    cats: [{nombre: 'tipo_configuracion', relaciones: []}],
    cl_requerido:false,
    eliminar: false,
    key: 'configuracion',
    label_s: 'catalogos:configuracion',
    label_p: 'catalogos:configuraciones',
    icon: FaCogs,
    permiso_guardar: 'catalogos.guardar_catalogo',
    permiso_ver: 'catalogos.ver_catalogos',
    relaciones: ['tipo_configuracion'],
    schema: sch_configuracion
};
