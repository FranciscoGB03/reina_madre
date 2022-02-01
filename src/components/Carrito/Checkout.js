import React, {useEffect, useState} from 'react';
import Template from "../Template/Template/Template";
import i18next from "i18next";
import Titulo from "../Template/Template/Titulo";
import {FaWallet} from "react-icons/fa";
import {isMobile} from 'react-device-detect';
import ChPartidas from "./ChPartidas";
import {getItemsEnCarrito} from "../../services/carritoService";
import {cerrarAlert, seguroContinuar} from "../../services/swalService";
import {iniciar} from "../../api/transaccionesApi";
import {getUID} from "../../services/jwtService";
import {getAccessToken} from "../../services/seguridad.service";
import ChDireccionPersonal from "./ChDireccionPersonal";
import ChPago from "./ChPago";
import ModalOxxo from "../Admin/Transacciones/ModalOxxo";
import {useStore} from "../../index";
import {Modal} from "bootstrap";

const Checkout = () => {
    const [items_ls, setItemsLs] = useState([]);
    const [items, setItems] = useState([]);
    const [envio_gratis, setEnvioGratis] = useState({meta: 0, actual: 0, porcentaje: 0, conseguido: false});
    const [stripe_url, setStripeUrl] = useState('');

    const [direccion, setDireccion] = useState({});
    const [info_personal, setInfoPersonal] = useState({});
    const [transaccion, setTransaccion] = useState({});

    useEffect(() => {
        setItemsLs(getItemsEnCarrito);
        useStore.setState({modalOxxo: new Modal(document.getElementById('modalOxxo'))});
    }, []);


    const iniciarTransaccion = (requiere_factura) => {
        seguroContinuar().then(r => {
            if (r.isConfirmed)
                iniciar(requiere_factura, items, direccion, info_personal, getUID(getAccessToken()), envio_gratis.conseguido).then(r => {
                    cerrarAlert();
                    setTransaccion(r);
                })
        })
    }

    return (
        <Template titulo={i18next.t('articulo:compra')} descripcion={i18next.t('articulo:compraDesc')}>
            <div className='d-flex flex-column'>
                <Titulo icono={FaWallet} titulo={i18next.t('articulo:compra')}/>
            </div>
            {isMobile && <div></div>}
            <div className='d-flex flex-wrap flex-md-nowrap justify-content-around'>
                <div className={`${isMobile && 'w-100'}`}>
                    <div className='z-depth-1 p-2 m-2'>
                        <ChPartidas items_ls={items_ls} items={items} setItems={setItems}
                                    envio_gratis={envio_gratis} setEnvioGratis={setEnvioGratis}
                                    bloquear={transaccion?.id !== undefined}/>
                    </div>
                </div>
                {(items_ls || []).length > 0 && <>
                    <div className={`${isMobile && 'w-100'}`}>
                        <ChDireccionPersonal direccion={direccion} setDireccion={setDireccion}
                                             info_personal={info_personal} setInfoPersonal={setInfoPersonal}
                                             bloquear={transaccion?.id !== undefined}/>
                    </div>
                    {direccion.id && <div className={`${isMobile && 'w-100'}`}>
                        <ChPago transaccion={transaccion} setTransaccion={setTransaccion}
                                info_personal={info_personal} onConfirmar={iniciarTransaccion}
                                setStripeUrl={setStripeUrl}/>
                    </div>}
                </>}
            </div>
            <ModalOxxo url={stripe_url}/>
        </Template>
    );
};


export default Checkout;
