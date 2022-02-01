import TooltipHover from "../TooltipHover";
import {FaTrash} from "react-icons/all";
import React from "react";
import i18next from "i18next";

const BotonEliminar = ({onClick}) => {
    return (
            <TooltipHover texto={i18next.t('general:eliminar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaTrash/>
                </span>
            </TooltipHover>
    );
}

export default BotonEliminar;
