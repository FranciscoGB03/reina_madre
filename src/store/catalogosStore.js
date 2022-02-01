import {
    eliminaGenerico, getAllGenerico,
    getMultiActivosGenerico,
    guardaGenerico
} from "../api/catalogosApi";
import {useStore} from "../index";
import {cerrarAlert, seguroContinuar} from "../services/swalService";
import {limpiaSeleccionado, nuevoSeleccionado} from "./generalStore";

export const cargarCatalogoEnItems = () => {
    const catalogo = useStore.getState().catalogo;
    if (catalogo.cats.length === 0)
        cargarSoloCatalogoEnItems();
    else
        getMultiActivosGenerico(catalogo.cats).then(res_cats => {
            let nuevos_cats = {};
            Object.entries(res_cats).map(pos => nuevos_cats[pos[0]] = pos[1].data);
            useStore.setState({cats: nuevos_cats});
            cargarSoloCatalogoEnItems();
        });
};

export const cargarSoloCatalogoEnItems = () => {
    const catalogo = useStore.getState().catalogo;
    getAllGenerico(catalogo.key, catalogo.relaciones).then(res => {
        cerrarAlert();
        useStore.setState({items: res});
    });
    nuevoSeleccionado();
}

export const guardarCatalogo = (key) => {
    guardaGenerico(key, useStore.getState().seleccionado, true, false).then(res => {
        cargarCatalogoEnItems(key);
        limpiaSeleccionado();
    })
}

export const eliminarCatalogo = (registro_id) => {
    const catalogo = useStore.getState().catalogo;
    seguroContinuar().then(r => {
        if (r.isConfirmed) {
            eliminaGenerico(catalogo.key, registro_id).then(res => {
                cargarSoloCatalogoEnItems();
            });
        }
    })
}

export const validaCatalogoSeleccionado = () => {
    const catalogo = useStore.getState().catalogo;
    catalogo.schema?.validate(useStore.getState().seleccionado, {abortEarly: false})
        .then(() => useStore.setState(s => ({errores: []})))
        .catch(err => useStore.setState(s => ({errores: err.errors})));
}


