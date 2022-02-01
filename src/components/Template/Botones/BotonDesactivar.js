import TooltipHover from "../TooltipHover";
import {FaBan} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const BotonDesactivar = ({onClick}) => {
    return (
            <TooltipHover texto={i18next.t('general:desactivar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaBan/>
                </span>
            </TooltipHover>
    );
}

export default BotonDesactivar;
