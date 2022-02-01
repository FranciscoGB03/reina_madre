import React from 'react';
import {noop} from "../../services/generalService";

const ColorSelector = ({colores = [], label = '', onSelect = noop, selected = {}, className, ver_ninguno = true}) => {
    return (
        <div className={`${className} btn-group`}>
            <button type="button" className="btn btn-xhlinks dropdown-toggle" data-toggle="dropdown"
                    style={{backgroundColor: selected.color || ''}}
                    aria-haspopup="true" aria-expanded="false">
                {selected.color ? selected.nombre : label}
            </button>
            <div className="dropdown-menu">
                {ver_ninguno && <div className='d-flex cursor mx-3 my-1'
                      onClick={() => onSelect({})}>
                    <div className='me-2 rounded-circle'
                         style={{backgroundColor: '#FFF', height: '20px', width: '20px'}}>
                    </div>
                    <span className='mx-2'>Sin Especificar</span>
                </div>}
                {colores.map((color, idx) =>
                    <div className='d-flex cursor mx-3 my-1'
                         key={idx}
                         onClick={() => onSelect(color)}>
                        <div key={idx}
                             className='me-2 rounded-circle border'
                             style={{backgroundColor: color.color, height: '20px', width: '20px'}}>
                        </div>
                        <span className='mx-2'>{color.nombre}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColorSelector;
