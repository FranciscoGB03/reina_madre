import React, {useState} from 'react';
import BotonBuscar from "../Botones/BotonBuscar";
import BotonCopiarPortapapeles from "../Botones/BotonCopiarPortapapeles";
import BotonNuevoRegistro from "../Botones/BotonNuevoRegistro";

const CardHeader = ({titulo_class, titulo_card, ver_boton_buscadores, ver_boton_copiar, ver_boton_nuevo, setSeleccionado, ver_buscadores, setVerBuscadores}) => {
    return (
        <div className=" card-header d-flex justify-content-between text-center py-0">
            <h5 className={titulo_class}>
                <i className="py-2 px-2">{titulo_card}</i>
            </h5>
            <div className='d-flex justify-content-end text-titulo-tabla mt-2'>
                {ver_boton_buscadores &&
                <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>}
                {ver_boton_copiar && <BotonCopiarPortapapeles div_tabla="div_tabla"/>}
                {ver_boton_nuevo && <BotonNuevoRegistro onNuevoRegistro={() => setSeleccionado({})}/>}
            </div>
        </div>
    );
};

export default CardHeader;
