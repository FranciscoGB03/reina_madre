import React from 'react';
import InteriorCarrito from "./InteriorCarrito";

const ChPartidas = ({bloquear, items_ls, items, setItems, envio_gratis, setEnvioGratis}) => {
    return (
        <InteriorCarrito items_ls={items_ls} ver_boton_pago={false}
                         items={items} setItems={setItems}
                         envio_gratis={envio_gratis} setEnvioGratis={setEnvioGratis}
                         bloquear={bloquear}/>
    );
};

export default ChPartidas;
