
import React from 'react';

const Titulo = ({titulo, icono = null, children, container = true}) => {
    const Icono = icono;
    return (
        <div className={`${container ? 'container' : ''} d-flex flex-row justify-content-between w-100`}>
            <div className="animated bounceInLeft py-2 d-flex justify-content-between w-100">
                <h1 className="txt_titulo d-flex py-0 flex-nowrap flex-shrink-0">
                    <div className="me-2">{icono && <Icono/>} {titulo}</div>
                </h1>
                <div className='w-100 d-flex justify-content-end'>
                    <div>{children}</div>
                </div>
            </div>

        </div>
    );
};

export default Titulo;
