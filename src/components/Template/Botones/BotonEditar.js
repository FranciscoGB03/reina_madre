import TooltipHover from "../TooltipHover";
import {FaEdit} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const BotonEditar = ({onClick}) => {
    return (
            <TooltipHover texto={i18next.t('general:editar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaEdit/>
                </span>
            </TooltipHover>
    );
}

export default BotonEditar;
