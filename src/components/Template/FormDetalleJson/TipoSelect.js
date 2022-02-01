import i18next from "i18next";
import Select from "../Select";
import React from "react";

const TipoSelect = ({campo, seleccionado, setSeleccionado, cats}) => {
    const handleChange = value => {
        let nuevo = seleccionado;
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex justify-content-between">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div>
                <Select options={cats[campo.cat_key]}
                        className='form-select-sm'
                        selected={seleccionado[campo.key]}
                        onSelect={e => handleChange(e)}/>
            </div>
        </div>
    )
};

export default TipoSelect;
