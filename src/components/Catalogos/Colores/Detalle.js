import React, {useEffect, useState} from 'react';
import {FaSave, FiCheckSquare, FiSquare} from "react-icons/all";
import {guardaGenerico} from "../../../api/catalogosApi";
import {noop} from "../../../services/generalService";
import {cerrarAlert} from "../../../services/swalService";
import EsNuevoEdit from "../../Template/EsNuevoEdit";
import i18next from "i18next";
import './colores.css';
import {ChromePicker} from "react-color";
import {can} from "../../../services/seguridad.service";

const Detalle = ({seleccionado, onGuardar}) => {
//|------Hooks/Constantes------|//
    const [registro, setRegistro] = useState(seleccionado);
    const [errores, setErrores] = useState([]);
    const [mostrarColores, setMostrarColores] = useState(false);
//|------UseEffects------|//
    useEffect(() => {
        let errores_l = [];
        if (!registro.nombre)
            errores_l.push(`${i18next.t('catalogos:elCampo')}${i18next.t('catalogos:nombre')}${i18next.t('catalogos:esRequerido')}`);
        setErrores(errores_l);
    }, [registro]);
    useEffect(() => setRegistro(seleccionado), [seleccionado]);

//|------API-------|//
    const guardarRegistro = () => {
        guardaGenerico('color', registro)
            .then(res => {
                cerrarAlert();
                onGuardar(registro);
            })
            .catch(noop());
    }
//|------Data-------|//
    const handleSubmit = e => {
        e.preventDefault();
        guardarRegistro();
    };
    const handleClose = () => setMostrarColores(false);
    //|------Estilos------|//
    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    //|------render------|//
    return (
        <div className='order-first order-md-2 mx-sm-0 mx-md-3 mb-4 mb-md-0'>
            <div className=' z-depth-3'>
                <div className='card-header d-flex justify-content-between mb-0 pb-0 bg-xh-secondary'>
                    <div
                        className='text-titulos'>{i18next.t('catalogos:detalleDel')}{i18next.t('catalogos:permiso')}</div>
                    <EsNuevoEdit es_nuevo={registro.id == null}/>
                </div>
                <div className='card-body py-3'>
                    <form onSubmit={(e) => handleSubmit(e)} className='d-flex flex-column'>
                        <div className="form-group">
                            <label htmlFor="nombre">{i18next.t('catalogos:nombre')}*:</label>
                            <input className={`form-control form-control-sm ${!registro.nombre ? 'is-invalid' : ''}`}
                                   maxLength={50}
                                   autoFocus={true}
                                   name='nombre'
                                   value={registro.nombre || ''}
                                   onChange={(e) => setRegistro({...registro, nombre: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre" className="me-2">{i18next.t('catalogos:activo')}*:</label>
                            <span onClick={() => setRegistro({...registro, activo: !registro.activo})}>
                                {registro.activo ?
                                    <FiCheckSquare size={30} color='green'/> :
                                    <FiSquare color='red' size={30}/>}
                            </span>
                        </div>
                        <div className="d-flex justify-content-start mb-2">
                            <button className="btn btn-outline-blue btn-sm p-0 m-0 me-2 px-1"
                                    type="button"
                                    onClick={() => {
                                        setMostrarColores(true);
                                    }}>
                                {i18next.t('catalogos:seleccionaColor')}
                            </button>
                            <div className='color-border'
                                 style={{borderLeftColor: registro.color}}>{registro.color}</div>
                        </div>
                        {mostrarColores ?
                            <div style={popover}>
                                <div style={cover} onClick={handleClose}/>
                                <ChromePicker
                                    color={registro.color}
                                    disableAlpha={true}
                                    onChange={e => {
                                        setRegistro({...registro, color: e.hex})
                                    }}/></div> : null}
                        <div className='d-flex justify-content-end'>
                            {can('catalogos.guardar_colores') &&
                            <button disabled={errores.length > 0} type="submit" className='btn btn-xhlinks cursor'>
                                <div className='d-flex justify-content-center'>
                                    <FaSave/> <span className='ms-1'>{i18next.t('general:guardar')}</span>
                                </div>
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Detalle;
