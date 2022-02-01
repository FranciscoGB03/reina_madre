import TooltipHover from "../TooltipHover";
import {BsCloudUpload} from "react-icons/all";
import React from "react";
import i18next from "i18next";

const BotonSubirImagen = ({onClick}) => {
    return (
        <TooltipHover texto={i18next.t('general:agregarImagen')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <BsCloudUpload/>
                </span>
        </TooltipHover>
    );
}

export default BotonSubirImagen;
