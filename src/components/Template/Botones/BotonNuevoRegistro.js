import TooltipHover from "../TooltipHover";
import {FaPlusCircle} from "react-icons/fa";
import React from "react";
import {noop} from "../../../services/generalService";
import i18next from "i18next";

const BotonNuevoRegistro = ({onNuevoRegistro = noop()}) => {
    return (
        <TooltipHover texto={i18next.t('general:nuevoRegistro')}>
            <span className='mx-2 link cursor' onClick={()=>onNuevoRegistro()}>
                <FaPlusCircle/>
            </span>
        </TooltipHover>
    );
}

export default BotonNuevoRegistro;
