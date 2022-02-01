import React, {useEffect, useState} from 'react';
import {modificarCantidadCarrito, quitarItemCarrito} from "../../services/carritoService";
import {getConfig} from "../../services/configuracionesService";
import {getInfoParaCarrito} from "../../api/productosApi";
import {cerrarAlert} from "../../services/swalService";
import produce from "immer";
import ItemCarrito from "./ItemCarrito";
import {FaWallet} from "react-icons/fa";
import i18next from "i18next";
import NumberFormat from "react-number-format";
import {noop} from "../../services/generalService";

const InteriorCarrito = ({
                             items_ls, ver_boton_pago = true, bloquear = false, setItemsExt = noop,
                             items, setItems, envio_gratis, setEnvioGratis, onIrCheckout
                         }) => {

    const [subtotal, setSubtotal] = useState(0);


    useEffect(() => {
        if ((items_ls || []).length > 0)
            cargarInfoCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items_ls]);

    useEffect(() => {
        setSubtotal(items.reduce((a, b) => a + (parseInt(b.cantidad) * parseFloat(b.precio_mxn)), 0));
    }, [items]);

    useEffect(() => {
        let meta = getConfig('mxn_envio_gratis') || 1;
        setEnvioGratis({
            meta: meta,
            actual: subtotal,
            porcentaje: meta !== 0 ? Math.round(subtotal / meta * 100) : 0,
            conseguido: subtotal >= meta
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subtotal]);

    const cargarInfoCarrito = () => getInfoParaCarrito(items_ls).then(res => {
        cerrarAlert();
        setItems(res);
        setItemsExt(res);
    })

    const handleAgregarPieza = (idx) => {
        if (items[idx].existencia >= (items[idx].cantidad + 1)) {
            setItems(produce(items, d => void (d[idx].cantidad = d[idx].cantidad + 1)));
            modificarCantidadCarrito(items[idx].uuid, +1)
        }
    }
    const handleDisminuirPieza = (idx) => {
        if ((items[idx].cantidad - 1) >= 1) {
            setItems(produce(items, d => void (d[idx].cantidad = d[idx].cantidad - 1)));
            modificarCantidadCarrito(items[idx].uuid, -1)
        }
    }

    const handleEliminar = (idx) => {
        quitarItemCarrito(items[idx].uuid);
        setItems(items.filter((_, i) => i !== idx));
    }
    return (
        <div>
            {(items || []).length > 0 ? <div>
                {(items || []).map((i, idx) =>
                    <ItemCarrito key={idx} item={i} handleAgregarPieza={handleAgregarPieza}
                                 bloquear={bloquear}
                                 onEliminar={() => handleEliminar(idx)}
                                 handleDisminuirPieza={handleDisminuirPieza} idx={idx}/>
                )}
                <Subtotal subtotal={subtotal} envio_gratis={envio_gratis}/>
                <RevisaEnvio envio_gratis={envio_gratis}/>
                {ver_boton_pago && <button onClick={onIrCheckout}
                                           data-bs-dismiss="offcanvas" data-bs-target="#carritoDerecha"
                                           className='btn btn-lg btn-outline-success d-flex flex-nowrap w-100 justify-content-center mb-4'>
                    <FaWallet className='mt-1 mx-2'/> {i18next.t('articulo:procederPago')}
                </button>}
            </div> : <div>{i18next.t('articulo:noItemsCarrito')}</div>}
        </div>
    );
};

const Subtotal = ({subtotal, envio_gratis}) => {
    return (<div className='d-flex flex-column'>
        <h5 className='d-flex justify-content-between ps-3'>
            <div>{i18next.t('articulo:subtotal')}:</div>
            <NumberFormat value={subtotal}
                          thousandSeparator={true}
                          fixedDecimalScale={true}
                          decimalScale={2}
                          prefix="$"
                          suffix=" MXN"
                          displayType="text"/>
        </h5>
        <h5 className='d-flex justify-content-between ps-3'>
            <div>{i18next.t('articulo:gastosEnvio')}:</div>
            <NumberFormat value={envio_gratis.conseguido ? 0 : getConfig('precio_envio')}
                          thousandSeparator={true}
                          fixedDecimalScale={true}
                          decimalScale={2}
                          prefix="$"
                          suffix=" MXN"
                          displayType="text"/>
        </h5>
    </div>);
}

const RevisaEnvio = ({envio_gratis}) => {
    return (<div className='alert alert-warning my-3'>
        <div>
            {
                envio_gratis.conseguido ?
                    i18next.t('articulo:envioGratisAlcanzado') :
                    `${i18next.t('articulo:gastaAlMenos')} ${envio_gratis?.meta} MXN ${i18next.t('articulo:paraGratis')}`
            }
        </div>
        <div className="progress">
            <div className={`progress-bar ${envio_gratis?.conseguido && 'bg-success'}`}
                 role="progressbar"
                 style={{width: `${envio_gratis.porcentaje}%`}} aria-valuenow={parseInt(envio_gratis?.porcentaje)}
                 aria-valuemin="0" aria-valuemax="100">
            </div>

        </div>
    </div>)
}

export default InteriorCarrito;
