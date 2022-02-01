import {getMultiActivosGenerico} from "../api/catalogosApi";
import {useStore} from "../index";
import {getPacks, getPresentaciones} from "../api/inventarioApi";
import {cerrarAlert} from "../services/swalService";

const cargarInventarios = () => {
    getPresentaciones(true).then(pres => {
        useStore.setState({presentaciones: pres})
        getPacks().then(packs => {
            useStore.setState({packs: packs})
            cerrarAlert();
        });
    })
}
export const initInventario = (cargarCatalogos = true) => {
    const peticiones = [
        {nombre: 'categoria', relaciones: ['marcas.sabores.presentaciones']},
        {nombre: 'tipo_movimiento', relaciones: []},
    ];
    if (cargarCatalogos)
        getMultiActivosGenerico(peticiones)
            .then(res => {
                useStore.setState({cats: res})
                cargarInventarios();
            });
    else
        cargarInventarios();
}
