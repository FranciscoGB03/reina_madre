import React, {useState} from 'react';
import {AiFillBank, FaCheckCircle, FaCreditCard, FaMoneyBillAlt, FaRegTimesCircle, FaWallet} from "react-icons/all";
import i18next from "i18next";
import {PayPalButton} from "react-paypal-button-v2";
import {cancelarTransaccion, getStripeUrl, iniciarTransferencia, pagarTransaccion} from "../../api/transaccionesApi";
import {cerrarAlert, ocultableSuccess, seguroContinuar, staticOcultableInfo} from "../../services/swalService";
import {FORMA_PAGO_DEPOSITO_EFECTIVO, FORMA_PAGO_PAYPAL, FORMA_PAGO_TARJETA_DEBITO} from "../../constants/articulos";
import {useHistory} from "react-router";
import {limpiarCarrito} from "../../services/carritoService";
import {noop} from "../../services/generalService";

const ChPago = ({transaccion, setTransaccion, onConfirmar, setStripeUrl}) => {


        const history = useHistory();
        const [requiere_factura, setRequiereFactura] = useState(false);

        const consultarStripeUrl = (tipo) => {
            let payment_method_types = tipo === 'CARD' ? ['card'] : ['oxxo']
            seguroContinuar().then(r => {
                    if (r.isConfirmed) {
                        staticOcultableInfo(i18next.t('articulo:pagoIns'), i18next.t('articulo:infoImportante')).then(() => {
                                let forma_pago = tipo === 'CARD' ? FORMA_PAGO_TARJETA_DEBITO : FORMA_PAGO_DEPOSITO_EFECTIVO;
                                getStripeUrl(transaccion.uuid, payment_method_types, forma_pago).then(r => {
                                    cerrarAlert();
                                    if (tipo === 'OXXO') {
                                        window.open(r, '_blank');
                                        history.push(`/transacciones/ppv/${transaccion.uuid}`)
                                    } else
                                        window.location.href = r;
                                });
                            }
                        );
                    }
                }
            )
        }

        const handlePagar = details => {
            const folio_paypal = details.id || '*';
            const pago_observaciones = `email:${details?.payer?.email_address || '*'} payer_id:${details?.payer?.payer_id || '*'} name:${details?.payer?.name?.given_name || '*'}`;
            const completed = details.status === "COMPLETED";
            pagar(FORMA_PAGO_PAYPAL, folio_paypal, pago_observaciones, completed);
        };

        const handleTransferencia = () => {
            seguroContinuar().then(r => {
                if (r.isConfirmed) {
                    iniciarTransferencia(transaccion.uuid).then(() => {
                        staticOcultableInfo(i18next.t('articulo:transferenciaIns'), i18next.t('articulo:infoImportante')).then(() => {
                            history.push(`/transacciones/ppv/${transaccion.uuid}`);
                        });
                    }).catch(noop);
                }
            });
        };

        const handleCancelar = () => {
            seguroContinuar().then(r => {
                if (r.isConfirmed)
                    cancelarTransaccion(transaccion.uuid).then(() => {
                        cerrarAlert();
                        setTransaccion({});
                    });
            })
        };

        const pagar = (forma_pago, referencia_externa = '', pago_observaciones = '', pago_validado = false) => {
            pagarTransaccion(transaccion.uuid, forma_pago, referencia_externa, pago_observaciones, pago_validado).then(() => {
                ocultableSuccess(i18next.t('articulo:compraCorrectaText'), i18next.t('articulo:compraCorrecta')).then(() => {
                    const uuid = transaccion?.uuid;
                    setTransaccion({});
                    limpiarCarrito();
                    history.push(`/transacciones/ver/${uuid}`);
                });
            });
        }
        return (<div className='m-2 z-depth-1 p-3 d-flex flex-column'>
            {transaccion?.id ? <>
                <h5><FaWallet/> {i18next.t('articulo:elijaFormaPago')}</h5>
                <div className='fw-lighter text-small'>ID: {transaccion?.uuid}</div>
                <PayPalButton
                    amount={transaccion.total || 0}
                    onError={handleCancelar}
                    onSuccess={handlePagar}
                    onCancel={handleCancelar}
                    options={{
                        currency: 'MXN',
                        clientId: process.env.REACT_APP_PP_CLIENTID,
                        disableFunding: "credit,card"
                    }}
                />
                <button className='btn btn-warning my-2 d-flex flex-nowrap'
                        onClick={() => consultarStripeUrl('CARD')}>
                    <FaCreditCard className='mt-1 mx-2'/>
                    {i18next.t('articulo:pagoTarjeta')}
                </button>
                <button className='btn btn-warning my-2 d-flex flex-nowrap'
                        onClick={() => consultarStripeUrl('OXXO')}>
                    <FaMoneyBillAlt className='mt-1 mx-2'/>
                    {i18next.t('articulo:pagoOxxo')}
                </button>
                <button className='btn btn-warning my-2 d-flex flex-nowrap'
                        onClick={() => handleTransferencia()}>
                    <AiFillBank className='mt-1 mx-2'/>
                    {i18next.t('articulo:pagoTransferencia')}
                </button>
            </> : <div className='d-flex flex-column'>
                <div className='d-flex flex-nowrap cursor' onClick={() => setRequiereFactura(!requiere_factura)}>
                    {requiere_factura ? <FaCheckCircle className='mt-1 mx-2'/> : <FaRegTimesCircle className='mt-1 mx-2'/>}
                    <label>{i18next.t('articulo:requiereFactura')}</label>
                </div>
                <button className='btn btn-warning my-2' onClick={() => onConfirmar(requiere_factura)}>
                    {i18next.t('articulo:confirmarPedido')}
                </button>
            </div>}
        </div>);
    }
;

export default ChPago;
