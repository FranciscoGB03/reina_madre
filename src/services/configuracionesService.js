import {useStore} from "../index";

export const getConfig = c_buscada => {
    const configuraciones = useStore.getState().configuraciones;
    if (typeof configuraciones === 'undefined' || configuraciones === null || configuraciones.length === 0)
        return null;
    let conf = configuraciones[c_buscada];
    return (typeof conf !== 'undefined') && (conf !== null) ?  conf : null;
}
