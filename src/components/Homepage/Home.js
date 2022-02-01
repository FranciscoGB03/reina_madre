import React from 'react';
import Template from '../Template/Template';
import './home.css';
import i18next from "i18next";


const Home = () => {
    return (
        <Template titulo={process.env.REACT_APP_APP_NAME} descripcion={i18next.t('titulos:inicioDescripcion')}>
            <div className='d-flex flex-column'>
            </div>
        </Template>
    );
}
export default Home;
