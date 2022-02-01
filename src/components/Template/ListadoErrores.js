import React from 'react';
import i18next from "i18next";

const ListadoErrores = ({errores = []}) => {
    const arreglaTexto = (texto)=>{
        let partes = texto.split("##");
        if(partes.length < 3)
            return texto;
        return `${partes[0]} ${i18next.t(partes[1])} ${partes[2]}`;
    }

    return (
        <div className='alert alert-warning d-flex flex-column mt-2'>
            <h5>{i18next.t('general:atenderErrores')}</h5>
            <ul>
                {errores.map((error, idx) => <li key={idx}>{arreglaTexto(error)}</li>)}
            </ul>
        </div>
    );
};

export default ListadoErrores;
