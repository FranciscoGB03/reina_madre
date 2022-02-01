import TooltipHover from "../TooltipHover";
import {FaCopy} from "react-icons/fa";
import React from "react";
import {copiarPortapapeles} from "../../../services/generalService";
import i18next from "i18next";

const BotonCopiarPortapapeles = ({div_tabla = "divTabla"}) => {
    const handleClick = () => {
        copiarPortapapeles(div_tabla);
    };
    return (
        <TooltipHover texto={i18next.t('general:copiarPortapapeles')}>
                <span className='mx-2 link cursor'
                      onClick={() => handleClick()}>
                    <FaCopy/>
                </span>
        </TooltipHover>
    );
}

export default BotonCopiarPortapapeles;
