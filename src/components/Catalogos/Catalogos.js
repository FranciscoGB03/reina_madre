import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {isLogged} from "../../services/authService";
import i18next from "i18next";
import Listado from "./Listado";
import {useStore} from "../../index";
import Titulo from "../Template/Titulo";
import Detalle from "./Detalle";
import {cargarCatalogoEnItems} from "../../store/catalogosStore";
import {CATALOGOS_DATA} from "./data/catalogosData";
import {can} from "../../services/seguridad.service";
import SinPermiso from "../Template/SinPermiso";
import {limpiaSeleccionado} from "../../store/generalStore";
import Template from "../Template/Template";

const Catalogos = () => {
    const {key: key_catalogo} = useParams();
    const history = useNavigate();
    //|------Store------|//
    const {catalogo, seleccionado} = useStore.getState();
    // //|------UseEffects------|//
    useEffect(() => {
        limpiaSeleccionado();
        if (catalogo.key)
            cargarCatalogoEnItems()
    }, [catalogo]);
    // //|------Funciones------|//
    useEffect(() => {
        let catalogo = CATALOGOS_DATA[key_catalogo];
        catalogo !== undefined ? useStore.setState({catalogo: catalogo}) : history('/NotFound');
    }, [key_catalogo, history]);

    return (
        <Template>
            {isLogged() && can('catalogos.permiso_ver')?
                <div>
                    <div className="container">
                        <Titulo titulo={i18next.t('catalogos:administracionCatalogo') + i18next.t(catalogo.label_p)}
                                icono={catalogo.icon}/>
                    </div>
                    <div className="d-flex justify-content-center flex-wrap">
                        <div><Listado/></div>
                        <div>{seleccionado !== null && <Detalle/>}</div>
                    </div>
                </div> : <SinPermiso/>}
        </Template>
    );
}
export default Catalogos;
