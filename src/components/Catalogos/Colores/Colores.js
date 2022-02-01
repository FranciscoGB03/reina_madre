import React, {useEffect, useState} from 'react';
import Titulo from "../../Template/Titulo";
import Listado from "./Listado";
import Detalle from "./Detalle";
import i18next from 'i18next';
import {getAllGenerico} from "../../../api/catalogosApi";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import {can} from "../../../services/seguridad.service";
import SinPermiso from "../../Template/SinPermiso";


const Colores = () => {
    //|-----Hooks/Constantes------|//
    const [registrosAll, setRegistrosAll] = useState([]);
    const [seleccionado, setSeleccionado] = useState(null);

    //|------UseEffects-------|//
    useEffect(() => cargarRegistros(), []);


    //|------API------|//
    const cargarRegistros = () => getAllGenerico('color').then(res => {
        cerrarAlert();
        setRegistrosAll(res);
    }).catch(noop())

//|------Data------|//
    const onGuardar = () => {
        cargarRegistros();
        setSeleccionado(null);
    };

    return (
        can('catalogos.ver_colores') ? <div className='d-flex flex-column'>
                <Titulo
                    titulo={`${i18next.t('catalogos:administracionCatalogo')} ${i18next.t('catalogos:colores')}`}></Titulo>
                <div className='container d-flex flex-wrap justify-content-around'>
                    <Listado registrosAll={registrosAll} setSeleccionado={setSeleccionado}
                             onEliminar={cargarRegistros}/>
                    {seleccionado && <Detalle seleccionado={seleccionado} onGuardar={onGuardar}/>}
                </div>
            </div> :
            <SinPermiso/>
    );
};
export default Colores;
