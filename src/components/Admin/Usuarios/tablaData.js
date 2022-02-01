import {FaBook} from "react-icons/fa";
import {sch_usuario} from "../../../validators";
import React from "react";
import Select from "../../Template/Select";
import {ESTATUS_USUARIO_ARR, GENERO} from "../../../constants/usuarios";
import i18next from "i18next";

const DisplayStatus = ({registro}) => {
    return (
        <div>
            {i18next.t(registro.estatus == 'ACT' ? 'usuario:activo' : 'usuario:inactivo')}
        </div>
    );
};
export const StatusSelect = ({filtro, setFiltro}) => {
    return (
        <Select options={ESTATUS_USUARIO_ARR}
                selected={{id: filtro.estatus}}
                onSelect={(e) => setFiltro({...filtro, estatus: (e?.id || '')})}/>
    );
};

export const METADATA = {
    campos: [
        {
            buscador_key: 'nombre',
            display: 'nombre',
            form_ver: true,
            form_tipo: 'text',
            key: 'nombre',
            label: 'usuario:nombre',
            max_length: 250,
            show_buscador: true,
            show_sort: true,
            sort_key: 'nombre',
            ver_en_tabla: true
        },
        {
            buscador_key: 'fecha_nacimiento',
            display: 'fecha_nacimiento',
            form_ver: true,
            form_tipo: 'datepicker',
            key: 'fecha_nacimiento',
            label: 'usuario:fechaNacimiento',
            show_buscador: true,
            show_sort: true,
            sort_key: 'fecha_nacimiento',
            ver_en_tabla: true
        },
        {
            buscador_key: 'email',
            display: 'email',
            form_ver: true,
            form_tipo: 'text',
            key: 'email',
            label: 'usuario:email',
            max_length: 250,
            show_buscador: true,
            show_sort: true,
            sort_key: 'email',
            ver_en_tabla: true
        },
        {
            buscador_key: 'genero',
            display: 'genero',
            form_ver: true,
            form_tipo: 'select_en_duro',
            key: 'genero',
            label: 'usuario:genero',
            show_buscador: true,
            show_sort: true,
            sort_key: 'genero',
            ver_en_tabla: true,
            cats:GENERO
        },
        {
            buscador_key: 'telefono',
            display: 'telefono',
            form_ver: true,
            form_tipo: 'text',
            key: 'telefono',
            label: 'usuario:telefono',
            max_length: 13,
            show_buscador: true,
            show_sort: true,
            sort_key: 'telefono',
            ver_en_tabla: true
        },
        {
            buscador_key: 'celular',
            display: 'celular',
            form_ver: true,
            form_tipo: 'text',
            key: 'celular',
            label: 'usuario:celular',
            max_length: 13,
            show_buscador: true,
            show_sort: true,
            sort_key: 'celular',
            ver_en_tabla: true
        },
        {
            buscador_key: 'fecha_ingreso',
            display: 'fecha_ingreso',
            form_ver: true,
            form_tipo: 'datepicker',
            key: 'fecha_ingreso',
            label: 'usuario:fechaIngreso',
            show_buscador: true,
            show_sort: true,
            sort_key: 'fecha_ingreso',
            ver_en_tabla: true
        },
        {
            buscador_key: 'rol.nombre',
            cat_key: 'rol',
            display: 'rol.nombre',
            form_ver: true,
            form_tipo: 'select',
            key: 'rol',
            label: 'usuario:rol',
            show_buscador: true,
            show_sort: true,
            sort_key: 'rol.nombre',
            ver_en_tabla: true
        }
    ],
    cats: [{nombre: 'rol', relaciones: []}],
    cl_requerido: false,
    eliminar: false,
    key: 'usuarios',
    label_s: 'catalogos:usuario',
    label_p: 'catalogos:usuarios',
    icon: FaBook,
    permiso_editar: 'admin.editar_usuarios',
    permiso_eliminar: 'admin.eliminar_usuarios',
    permiso_guardar: 'admin.editar_usuarios',
    permiso_ver: 'catalogos.ver_catalogos',
    schema: sch_usuario
}

