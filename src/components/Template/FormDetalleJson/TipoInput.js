import i18next from "i18next";
import TextAreaAutosize from "react-textarea-autosize";
import React from "react";

const TipoInput = ({campo, seleccionado, setSeleccionado}) => {
    const handleChange = value => {
        let nuevo = seleccionado;
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (<div className="mt-1 d-flex justify-content-between">
        <label className="mx-2">{i18next.t(campo?.label)}:</label>
        <div>
            {campo.form_tipo === 'textarea' ?
                <TextAreaAutosize className='form-control form-control-sm'
                                  placeholder={i18next.t(campo?.label)}
                                  value={seleccionado[campo.key] || ''}
                                  onChange={e => handleChange(e.target.value)}/> :
                <input className='form-control form-control-sm'
                       placeholder={i18next.t(campo?.label)}
                       maxLength={campo.max_length}
                       type={campo.form_tipo}
                       value={seleccionado[campo.key] || ''}
                       onChange={e => handleChange(e.target.value)}/>}
        </div>
    </div>);
}

export default TipoInput;
