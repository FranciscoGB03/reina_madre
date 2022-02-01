import {cargarConfiguraciones, cargarPermisos} from "../services/seguridad.service";
import create from 'zustand';
import {cargarUsuario} from "./generalStore";

export const myStore = create(set => ({
        campo:null,
        catalogo: {},//Posicion del CatalogoData
        cats: {},//Catálogos cargados
        configuraciones: null,
        control: 0,
        errores: [],
        items: null,
        registroPassword:null,
        modalCambiarPassword:null,
        modalArchivoAdjunto:null,
        modalCarrito: null,
        modalLogin: null,
        modalDetalle:null,
        modalEditor:null,
        modalEstatus:null,
        modalOxxo:null,
        modalPack:null,
        packs: [],
        permisos: null,
        presentaciones: null,
        roles:[],
        seleccionado: null,
        usuario: null,
        cargaPermisos: () => cargarPermisos(),
        cargaConfiguracion: () => cargarConfiguraciones(),
        cargaUsuario: () => cargarUsuario(),
        controla: () => set(state => ({control: state.control + 1})),
        limpiaStore: () => myStore.setState({...myStore, ...{'permisos': [], 'roles': [], items: null, seleccionado: null}})
    })
);
