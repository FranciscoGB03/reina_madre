import {RiHomeGearLine, RiAdminFill} from 'react-icons/ri';
import {FcRules} from "react-icons/fc";
import {BsBook, BsGearWideConnected, BsGear} from "react-icons/bs";
import {ImUserTie} from 'react-icons/im';
import {AiOutlineSecurityScan} from 'react-icons/ai';
import {GrConfigure} from 'react-icons/gr';
import {FaUserTie} from "react-icons/fa";
import {isLogged, logout} from "../../../services/authService";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import {BiCategory} from "react-icons/bi";

/**
 * Estructura de Menu
 * keyLang: Key a cargar en el lang
 * icono: Debe ser importado de react icons
 * permiso: permiso
 * publico: true| false hace referencia de si es publica o no la opción del navbar
 * tipo: navLink | simple | dropdown
 * nlOptions: Propiedades de navlink (to/)
 * onClick: Sólo funciona para tipo simple
 * separador:true|false coloca una linea separadora entre las opciones
 */

export const ITEMS_IZQUIERDA = {
    menus: [
        {
            keyLang: 'navbar:departamentoEmpresa',
            icono: MdOutlineMapsHomeWork,
            publico: true,
            tipo: 'navlink',
            nlOptions: {to: '/departamentoEmpresa'}
        }
    ]
};
export const ITEMS_DERECHA = {
    menus: [
        {
            keyLang: 'admin:admin',
            icono: RiAdminFill,
            permiso: 'navbar.ver_admin',
            publico: false,
            tipo: 'dropdown',
            navlinks: [
                {
                    keyLang: 'admin:configuracion',
                    to: "/admin/configuracion",
                    icono: RiHomeGearLine,
                    permiso: 'navbar.ver_configuracion_admin',
                    publico: false
                },
                {
                    keyLang: 'admin:permisos',
                    to: "/admin/permisos",
                    icono: FcRules,
                    permiso: 'navbar.ver_permisos_admin',
                    publico: false
                },
                {
                    keyLang: 'admin:usuarios',
                    to: "/admin/usuarios",
                    icono: FaUserTie,
                    permiso: 'navbar.ver_usuarios_admin',
                    publico: false
                }
            ]
        },
        {
            keyLang: 'catalogos:catalogos',
            icono: BsBook,
            permiso: 'navbar.ver_catalogos',
            tipo: 'dropdown',
            publico: false,
            navlinks: [
                {
                    keyLang: 'catalogos:tipoConfiguracion',
                    to: "/catalogos/tipo_configuracion",
                    icono: BsGear,
                    permiso: 'navbar.ver_tipo_configuracion',
                    publico: false
                },
                {
                    keyLang: 'catalogos:configuracion',
                    to: "/catalogos/configuracion",
                    icono: GrConfigure,
                    permiso: 'navbar.ver_configuraciones',
                    publico: false,
                    separador: true
                },
                {
                    keyLang: 'catalogos:empresas',
                    to: "/catalogos/empresa",
                    icono: BiCategory,
                    permiso: 'navbar.ver_empresas',
                    publico: false
                },
                {
                    keyLang: 'catalogos:departamentos',
                    to: "/catalogos/departamento",
                    icono: BiCategory,
                    permiso: 'navbar.ver_departamentos',
                    publico: false
                },
                {
                    keyLang: 'catalogos:roles',
                    to: "/catalogos/rol",
                    icono: ImUserTie,
                    permiso: 'navbar.ver_roles',
                    publico: false
                },
                {
                    keyLang: 'catalogos:seccionPermiso',
                    to: "/catalogos/seccion_permiso",
                    icono: BsGearWideConnected,
                    permiso: 'navbar.ver_seccion_permisos',
                    publico: false
                },
                {
                    keyLang: 'catalogos:permisos',
                    to: "/catalogos/permiso",
                    icono: AiOutlineSecurityScan,
                    permiso: 'navbar.ver_permiso',
                    publico: false
                }
            ]
        },
        {
            keyLang: 'general:cerrarSesion',
            tipo:'simple',
            publico: ()=>isLogged(),
            onClick:()=>logout(),
        }
    ]
    // menus: [
    //     {
    //         keyLang: 'general.catalogos',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'dropdown',
    //         navlinks: [
    //             {keyLang: 'nose.1', to: "reportes/uno"},
    //             {keyLang: 'nose.1', to: "reportes/dos", icono: FaList},
    //             {keyLang: 'nose.1', to: "reportes/tres"},
    //             {keyLang: 'nose.1', to: "reportes/cuatro"}
    //         ]
    //     },
    //     {
    //         keyLang: 'general.admin',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'dropdown',
    //         navlinks: [
    //             {keyLang: 'nose.1', to: "reportes/uno"},
    //             {keyLang: 'nose.1', to: "reportes/dos", icono: FaList},
    //             {keyLang: 'nose.1', to: "reportes/tres"},
    //             {keyLang: 'nose.1', to: "reportes/cuatro"}
    //         ]
    //     },
    //     {
    //         keyLang: 'general.jobs',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'navlink',
    //         nlOptions: {to: 'jobs'}
    //     },
    // ]
};
