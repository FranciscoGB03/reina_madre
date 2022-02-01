import React from 'react';
import Select from "../Select";
import i18next from "i18next";

const TipoSelectEnDuro = ({campo,seleccionado,setSeleccionado}) => {
    const handleChange = value => {
        let nuevo = seleccionado;
        nuevo[campo.key] = value?.id;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex justify-content-between">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div>
                <Select options={campo.cats}
                        className='form-select form-select-sm'
                        selected={{id: seleccionado[campo.key]}}
                        onSelect={e => handleChange(e)}/>
            </div>
        </div>
    )
};

export default TipoSelectEnDuro;