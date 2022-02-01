import {getCatalogos} from "../api/catalogosApi";
import {cerrarAlert} from "../services/swalService";
import {useStore} from "../index";
import {limpiaSeleccionado} from "./generalStore";

export const cargarAsignarPermisos = () => {
    limpiaSeleccionado();
    getCatalogos([
        {
            nombre: 'rol',
            metodo: 'orderBy',
            relaciones: ['rels_rol_permiso', 'usuarios']
        },
        {nombre: 'seccion_permiso', relaciones: ['permisos'], metodo: 'orderBy'},
        {nombre: 'usuario', relaciones: [], metodo: 'orderBy'}
    ]).then(res => {
        useStore.setState(s=>({...s,
            roles: res.rol.data,
            seccion_permisos: res.seccion_permiso.data,
            usuarios: res.usuario.data
        }));
        cerrarAlert();
    });

}
