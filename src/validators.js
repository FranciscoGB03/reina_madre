import * as yup from 'yup';
import es from 'yup-es';

yup.setLocale(es);

export const sch_ejemplo = yup.object().shape({
    categoria: yup.mixed().label('##articulo:categoria##').required(),
    subcategoria: yup.mixed().label('##articulo:subcategoria##').required(),
    descripcion: yup.string().label('##articulo:descripcion##').required().max(500),
    info_adicional: yup.string().label('##articulo:infoAdicional##').required().max(500),
});

export const sch_configuracion = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(50),
    descripcion: yup.string().label('##catalogos:descripcion##').required().max(250),
    valor: yup.string().label('##catalogos:valor##').required().max(200),
    tipo_configuracion: yup.mixed().label('##articulo:seccionPermiso##').required(),
});
export const sch_contacto = yup.object().shape({
    email: yup.string().label('##usuario:email##').required().max(70),
    nombre: yup.string().label('##usuario:nombre##').required().max(70),
    apellidos: yup.string().label('##usuario:apellidos##').required().max(70),
    fecha_nacimiento: yup.mixed().label('##usuario:fechaNacimiento##').required(),
    telefono: yup.string().label('##usuario:telefono##').required().max(12),
});
export const sch_nombre = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(250),
});
export const sch_cliente = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(250),
    observaciones: yup.string().label('##catalogos:observaciones##').required().max(250),
});
export const sch_permiso = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(80),
    descripcion: yup.string().label('##catalogos:descripcion##').required().max(100),
    seccion_permiso: yup.mixed().label('##articulo:seccionPermiso##').required()
});

export const sch_subcategoria = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(250),
    categoria: yup.mixed().label('##catalogos:categoria##').required(),
});
export const sch_seccion_permiso = yup.object().shape({
    nombre: yup.string().label('##catalogos:nombre##').required().max(50),
});
export const sch_usuario = yup.object().shape({
    nombre: yup.string().label('##usuario:nombre##').required().max(70),
    fecha_nacimiento:yup.date().label('##usuario:nombre##').required(),
    email: yup.string().label('##usuario:email##').required().max(100),
    rol: yup.mixed('##usuario:rol##').required(),
});
