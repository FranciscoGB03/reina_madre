import {permiso} from "./permiso";
import {rol} from "./rol";
import {tipo_configuracion} from "./tipoConfiguracion";
import {seccion_permiso} from "./seccionPermiso";
import {configuracion} from "./configuracion";
import {departamento} from "./departamento";
import {empresa} from "./empresa";

export const CATALOGOS_DATA = {
    configuracion: configuracion,
    permiso: permiso,
    rol: rol,
    seccion_permiso: seccion_permiso,
    tipo_configuracion: tipo_configuracion,
    departamento:departamento,
    empresa:empresa
};


/*
Ejemplo De un data de catálogo, los campos con * son requeridos
{
    *campos:[] //Arreglo (Ver adelante)
    *cats:[] //Arreglo de catálogos a cargar (Usados en los selects)
    *cl_requerido: boolean //Indica si el catálogo requiere de cloudinary
    eliminar: false, //Si llama al metodo eliminar
    *key:string //Key usada para el backend
    *label_s:string //Nombre del catálogo en singular
    *label_p:string //Nombre del catálogo en plural
    *icon: Icon //A mostrar en el título
    *permiso_guardar: string || null //Permiso usado para saber si se puede guardar el catálogo
    *permiso_ver: string || null //Permiso usado para saber si se puede ver el catálogo
    *relaciones:[] //Relaciones a cargar del catálogo
    *schema:schema //Objeto que se usará para validar
}
 */

/*
Ejemplo De un campo de catálogo, los campos con * son requeridos
{
    *buscador_key:string ///Llave para buscar, por ejemplo nombre o seccion_permiso.nombre,
    cat_key:string //Requerida si el form_tipo=select,
    *display:string //Propiedad a mostrar en la tabla, por ejemplo nombre o seccion_permiso.nombre,
    *form_ver:boolean //Visible en el formulario,
    *form_tipo:string //Opciones disponibles text, number, select, check,
    *key:string //Key del campo, por ejemplo seccion_permiso,
    *label:string //Llave que se usará en el i18 del label de ese campo,
    max_length: int //requerido si form_tipo=text||textarea
    *show_buscador:boolean //Mostrar buscadores en la tabla,
    *show_sort:boolean //Mostrar ordenamientos en la tabla,
    sort_key:string //Requerida si show_sort=true, usada para ordenar, por ejemplo nombre o seccion_permiso,nombre,
    *ver_en_tabla: boolean //Ver registro como columna en la tabla:
}
 */
