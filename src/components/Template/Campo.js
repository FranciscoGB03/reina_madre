import React from 'react';
import {noop} from "../../services/generalService";

const Campo = ({
                   etiqueta,
                   data,
                   value,
                   onChange = noop(),
                   type = 'text',
                   placeholder = '',
                   step = 0,
                   containerClass = '',
                   labelClass = '',
                   inputClass = '',
                   maxLength = '',
                   minLength = '',
                   onKeyUp = noop(),
                   required = false,
                   autoFocus = false
               }) => {
    return (
        <div className={containerClass !== '' ? containerClass : "col-md-4"}>
            <label htmlFor={data} className={labelClass !== '' ? labelClass : "form-label"}>{etiqueta}</label>
            <input type={type}
                   name={data}
                   autoComplete='off'
                   value={value}
                   onChange={onChange}
                   className={inputClass !== '' ? inputClass : "form-control"}
                   placeholder={placeholder}
                   maxLength={maxLength}
                   minLength={minLength}
                   step={step}
                   onKeyUp={onKeyUp}
                   required={required}
                   autoFocus={autoFocus}/>
        </div>
    );
}

export default Campo;
