import TooltipHover from "../TooltipHover";
import {FaSearchPlus, FaSearchMinus} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const BotonBuscar = ({ver_buscadores, setVerBuscadores}) => {
    return (ver_buscadores ?
            <TooltipHover texto={i18next.t('general:ocultarBuscadores')}>
                <span className='mx-2 link cursor'
                      onClick={() => setVerBuscadores(false)}>
                    <FaSearchMinus/>
                </span>
            </TooltipHover> :
            <TooltipHover texto={i18next.t('general:mostrarBuscadores')}>
                <span className='mx-2 link cursor'
                      onClick={() => setVerBuscadores(true)}>
                    <FaSearchPlus/>
                </span>
            </TooltipHover>
    );
}

export default BotonBuscar;
