import {useStore} from "../index";
import {getLS, limpiarLs, setLS} from "./localStorageService";
import {staticOcultableInfo} from "./swalService";
import i18next from "i18next";
import {getConfig} from "./configuracionesService";

export const mostrarCarrito = () => {
    useStore.getState().modalCarrito.show();
}

export const getItemsEnCarrito = () => getLS('carrito');

export const agregarItemACarrito = (tipo, uuid, cantidad, precio_mxn) => {
    let items = getItemsEnCarrito() || [];
    let items_de_tipo = items.filter(i => i.tipo === tipo);
    let idx = items_de_tipo.map(i => i.uuid).indexOf(uuid);
    if (idx >= 0) {
        staticOcultableInfo(i18next.t('articulo:talVezCantidad'), i18next.t('articulo:itemEnCarrito'));
        return;
    }
    items.push({tipo, uuid, cantidad, precio_mxn});
    setLS('carrito', items);
    useStore.getState().modalCarrito.show();
    setEnvioGratisInfo();
}

export const quitarItemCarrito = (uuid) => {
    let items = getItemsEnCarrito() || [];
    let idx = items.map(i => i.uuid).indexOf(uuid);
    items.splice(idx, 1);
    setLS('carrito', items);
    setEnvioGratisInfo();
}

export const limpiarCarrito = ()=>{
    limpiarLs('carrito');
    limpiarLs('envio_gratis');
    useStore.getState().controla();
}

export const modificarCantidadCarrito = (uuid, cantidad) => {
    let items = getItemsEnCarrito() || [];
    let nuevos_items = items.map(i => {
        if (i.uuid === uuid)
            i.cantidad = i.cantidad + cantidad
        return i;
    });
    setLS('carrito', nuevos_items);
    setEnvioGratisInfo();
}

export const setEnvioGratisInfo = () => {
    let items = getItemsEnCarrito() || [];
    let meta = getConfig('mxn_envio_gratis') || 1;
    let subtotal = items.reduce((a, b) => a + (parseInt(b.cantidad) * parseFloat(b.precio_mxn)), 0);
    setLS('envio_gratis', {
        meta: getConfig('mxn_envio_gratis'),
        actual: subtotal,
        falta: items.length > 0 ? meta - subtotal : meta,
        porcentaje: meta !== 0 ? Math.round(subtotal / meta * 100) : 0,
        conseguido: subtotal >= meta
    });
    useStore.getState().controla();
}
