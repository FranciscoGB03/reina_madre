import TooltipHover from "../TooltipHover";
import {FaRedo} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const BotonActivar = ({onClick}) => {
    return (
            <TooltipHover texto={i18next.t('general:desactivar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaRedo/>
                </span>
            </TooltipHover>
    );
}

export default BotonActivar;
