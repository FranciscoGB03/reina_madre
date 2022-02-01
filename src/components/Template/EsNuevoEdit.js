import TooltipHover from "./TooltipHover";
import {FaEdit, FaPlusCircle} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const EsNuevoEdit = ({es_nuevo}) => {
    const texto = es_nuevo ? i18next.t('catalogos:nuevoRegistro') : i18next.t('catalogos:editandoRegistro');
    return (
        <TooltipHover texto={texto}>
            {es_nuevo ?
                <div className='alert py-0 px-1 bg-subtitulos flex-nowrap'><FaPlusCircle/></div> :
                <div className='alert py-0 px-1 bg-subtitulos flex-nowrap'><FaEdit/></div>
            }
        </TooltipHover>
    );
}

export default EsNuevoEdit;
