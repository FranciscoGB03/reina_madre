import TooltipHover from "../TooltipHover";
import React from "react";
import {noop} from "../../../services/generalService";

const BotonIcono = ({texto, icono, onClick = noop, className=''}) => {
    const Icon = icono;
    return (
        <TooltipHover texto={texto}>
                <span className={`cursor hvr-grow mx-2 ${className}`}
                      onClick={onClick}>
                    <Icon/>
                </span>
        </TooltipHover>
    );
}

export default BotonIcono;
