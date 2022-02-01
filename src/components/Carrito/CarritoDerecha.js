import React, {useEffect, useState} from 'react';
import {getItemsEnCarrito} from "../../services/carritoService";
import i18next from "i18next";
import {FaShoppingCart} from "react-icons/fa";
import InteriorCarrito from "./InteriorCarrito";
import {useNavigate} from "react-router-dom";

const CarritoDerecha = () => {
    const history = useNavigate();
    const [items_ls, setItemsLs] = useState([]);
    const [items, setItems] = useState([]);
    const [envio_gratis, setEnvioGratis] = useState({meta: 0, actual: 0, porcentaje: 0, conseguido: false});
    useEffect(() => {
        let modal = document.getElementById('carritoDerecha');
        modal.addEventListener('show.bs.offcanvas', () => {
            setItemsLs(getItemsEnCarrito);
        })
        modal.addEventListener('hide.bs.offcanvas', () => {
            setItemsLs([]);
        })
        //setModal(document.getElementById('carritoDerecha'));
        // setModal(new Modal(document.getElementById('carritoDerecha')));
    }, []);


    const onIrCheckout = () => {
        history.push('/checkout');
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="carritoDerecha"
             aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                    <FaShoppingCart/> {i18next.t('articulo:carrito')} ({(items_ls || []).length})
                </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className="offcanvas-body py-0 d-flex flex-column">
                <InteriorCarrito items_ls={items_ls} items={items} setItems={setItems}
                                 envio_gratis={envio_gratis} setEnvioGratis={setEnvioGratis}
                                 onIrCheckout={onIrCheckout}/>
            </div>
        </div>
    );
};


export default CarritoDerecha;
