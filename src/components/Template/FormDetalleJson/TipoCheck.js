import i18next from "i18next";
import {RiCheckboxBlankLine, RiCheckboxLine} from "react-icons/ri";
import React from "react";

const TipoCheck = ({campo, seleccionado, setSeleccionado}) => {
    const handleClick = value => {
        let nuevo = seleccionado;
        nuevo[campo.key] = nuevo[campo.key] !== null ? !seleccionado[campo.key] : true;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div onClick={handleClick}>
                {seleccionado[campo.key] ?
                    <RiCheckboxLine color="green" size={30}/> : <RiCheckboxBlankLine size={30}/>}
            </div>
        </div>
    )
};

export default TipoCheck;
