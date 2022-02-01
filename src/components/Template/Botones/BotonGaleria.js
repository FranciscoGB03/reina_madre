import TooltipHover from "../TooltipHover";
import {FaImage} from "react-icons/fa";
import React from "react";
import i18next from "i18next";

const BotonGaleria = ({onClick}) => {
    return (
            <TooltipHover texto={i18next.t('general:verGaleria')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaImage/>
                </span>
            </TooltipHover>
    );
}

export default BotonGaleria;
