import React from 'react'
import Template from './Template';
import construccion from '../../assets/img/construccion.jpeg';
import i18next from "i18next";

const Construccion = () => {
    return (
        <Template titulo={i18next.t('titulo:construccion')} descripcion={i18next.t('titulo:construccionDescripcion')}>
            <div className="m-0">
                <img src={construccion} alt={i18next.t('construccion')} style={{height: "80vh", width: "100%"}}/>
                <div className="construccion text-wrap">{i18next.t('general:construccion')}</div>
            </div>
        </Template>
    );
}
export default Construccion;
