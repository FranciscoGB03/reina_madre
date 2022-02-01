import React from 'react';
import {getClUrl} from "../../services/cloudinaryService";
import BotonIcono from "../Template/Botones/BotonIcono";
import {FaRegMinusSquare, FaRegPlusSquare, FaTimesCircle} from "react-icons/fa";
import NumberFormat from "react-number-format";
import i18next from "i18next";

const ItemCarrito = ({item, handleDisminuirPieza, handleAgregarPieza, idx, onEliminar, bloquear=false}) => {
    return (
        <div className={`d-flex flex-nowrap my-4 ${item.cantidad > item.existencia && 'border border-danger border-rounded'}`}>
            <div className='w-25'>
                <img src={getClUrl(item.imagen_uuid)} alt={item.nombre} className='img-fluid'/>
            </div>
            <div className='d-flex flex-column mx-2 w-75'>
                <h5 className='fw-bold'>{item.nombre}</h5>
                {item?.presentacion_nombre && <h5 className='fst-italic mx-2'>{item.presentacion_nombre}</h5>}
                <h5 className='fw-light d-flex justify-content-end'>
                    {!bloquear && <BotonIcono icono={FaRegMinusSquare} onClick={() => handleDisminuirPieza(idx)}/>}
                    <label>{item.cantidad}</label>
                    {!bloquear && <BotonIcono icono={FaRegPlusSquare} onClick={() => handleAgregarPieza(idx)}/>}
                    <label className='mx-2'>x</label>
                    <NumberFormat value={item?.precio_mxn}
                                  thousandSeparator={true}
                                  fixedDecimalScale={true}
                                  decimalScale={2}
                                  prefix="$"
                                  suffix=" MXN"
                                  displayType="text"/>
                </h5>
                <div className='fw-light d-flex flex-nowrap justify-content-between cursor'
                     onClick={onEliminar}>

                    <FaTimesCircle className='mt-1 mx-2'/>
                    {i18next.t('articulo:remover')}
                </div>
                <div>
                    {item.cantidad > item.existencia &&
                    <div className='alert alert-danger'>{i18next.t('articulo:existenciaProblema')}</div>}
                </div>
            </div>
        </div>
    );
};

export default ItemCarrito;
