import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import errorImg from '../../assets/img/404.png';
import EtiquetasMeta from './EtiquetasMeta';
import i18next from "i18next";

const NotFound = () => {
    return (
        <div>
            <EtiquetasMeta titulo={i18next.t('titulo:error404')} descripcion={i18next.t('titulo:error404Descripcion')} />
            <Navbar />
            <div className="d-flex justify-content-center flex-wrap">
                <div className="">
                    <img className="centrado" src={errorImg} alt={i18next.t('general:error')} />
                </div>
                <div className="jumbotron contenido-error text-white text-wrap">
                    <p>{i18next.t('general:sitio')}</p>
                    <Link className="btn botonError text-white" to="/">{i18next.t('general:irInicio')}</Link>
                </div>
            </div>
        </div>

    );
}
const Navbar = () => {
    return (
        <nav className="navbar navbar__background navbar-expand-lg sticky-top">
            <NavLink to="/" className="navbar-brand" href="#">
                <span>{process.env.REACT_APP_APP_NAME}</span>
            </NavLink>
        </nav>
    );
}
export default NotFound;
