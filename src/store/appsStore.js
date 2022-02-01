import {cerrarAlert} from "../services/swalService";
import {useStore} from "../index";
import {getAllGenerico, guardaGenerico} from "../api/catalogosApi";
import {noop} from "../services/generalService";

export const cargarApps = () => {
    getAllGenerico("app").then(res => {
        cerrarAlert();
        useStore.setState({apps: res});
    })
};
export const guardarApp = () => {
    guardaGenerico('app', useStore.getState().seleccionado)
        .then(() => {
            cerrarAlert();
            useStore.setState({...useStore,seleccionado: {}})
            cargarApps();
        })
        .catch(noop());
}
export const setSeleccionado = (nuevo) => useStore.setState(s => ({seleccionado: {...s.seleccionado, ...nuevo}}));
