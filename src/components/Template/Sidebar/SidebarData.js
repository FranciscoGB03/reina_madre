import {
    FaDoorOpen,
    FaHome,
    FaBoxes,
    FaCity,
    FaMap,
    FaBullhorn,
    FaShoppingBag
} from "react-icons/fa";
import {
    FiLogIn,
    FiUserPlus,
    FiSettings,
    FiUser} from 'react-icons/fi';
import {logout} from "../../../services/authService";
import {Modal} from "bootstrap";
import {useStore} from "../../../index";

export const SIDE_ITEM = 'item';
export const SIDE_BIGITEM = 'bigitem';
export const SIDE_SEPARADOR = 'separador';

//|-------Funciones-------|//
export const launchModalIniciarSesion = () => {
    useStore.setState({modalLogin: new Modal(document.getElementById('modalLogin'))});
    useStore.getState().modalLogin.show();
};

const SidebarData = [
    {
        type: SIDE_ITEM,
        title: 'navbar:inicio',
        icon: FaHome,
        path: "/#home",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:packs',
        icon: FaShoppingBag,
        path: "/packs",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:productos',
        icon: FaBoxes,
        path: "/#categorias",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:nosotros',
        icon: FaCity,
        path: "/#nosotros",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:puntos',
        icon: FaHome,
        path: "/#puntos_venta",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:contacto',
        icon: FaMap,
        path: "/#contacto",
        always_visible: true,
    }, {
        type: SIDE_ITEM,
        title: 'navbar:blog',
        icon: FaBullhorn,
        path: "/blog",
        always_visible: true,
    },
    {type: SIDE_SEPARADOR, always_visible: true},
    {
        type: SIDE_ITEM,
        title: 'general:registrarse',
        icon: FiUserPlus,
        path: "/registrarse",
        always_visible: false,
        visible_con_sesion: false,
    },
    {
        type: SIDE_ITEM,
        title: 'general:iniciarSesion',
        icon: FiLogIn,
        onClick: launchModalIniciarSesion,
        path: "#",
        always_visible: false,
        visible_con_sesion: false,
    },
    {
        type: SIDE_ITEM,
        title: 'general:miPerfil',
        icon: FiUser,
        path: "/miPerfil",
        always_visible: false,
        visible_con_sesion: true,
    },
    {
        type: SIDE_ITEM,
        title: 'general:panelAdmin',
        icon: FiSettings,
        path: "/admin",
        always_visible: false,
        visible_con_sesion: true,
        permiso: 'admin.ver_admin'
    },
    {
        type: SIDE_ITEM,
        title: 'general:cerrarSesion',
        icon: FaDoorOpen,
        onClick: logout,
        path: "#",
        always_visible: false,
        visible_con_sesion: true,
    }
];
export default SidebarData;
