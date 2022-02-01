import React from 'react';
import {NavLink} from 'react-router-dom';
import i18next from "i18next";
import {ITEMS_DERECHA, ITEMS_IZQUIERDA} from "./Navbar.data";
import {can} from "../../../services/seguridad.service";
import {MdMenu} from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="navbar navbar__background navbar-expand-lg sticky-top text-small">
            <div className='container-fluid'>
                <NavLink to="/" className="navbar__link navbar-brand">
                    <span>{process.env.REACT_APP_APP_NAME}</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="text-white"><MdMenu/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Izquierda/>
                    <Derecha/>
                </div>
            </div>
        </nav>
    );
}
const Izquierda = () => {
    return (<ul className="navbar-nav me-auto">
        {(ITEMS_IZQUIERDA.menus || []).map((menu, key) => <Menu menu={menu} key={key} lado="izq"/>)}
    </ul>);
}
const Derecha = () => {
    return (<ul className="navbar-nav navbar-right">
        {(ITEMS_DERECHA.menus || []).map((menu, key) => <Menu menu={menu} key={key} lado="der"/>)}
    </ul>);
}

const Menu = ({menu, lado}) => <React.Fragment>
    {menu.tipo === 'navlink' && (can(menu.permiso) || menu.publico) && <NavLinkMenu menu={menu}/>}
    {menu.tipo === 'simple' && (can(menu.permiso) || menu.publico) && <SimpleMenu menu={menu}/>}
    {menu.tipo === 'dropdown' && (can(menu.permiso) || menu.publico) && <DropdownMenu menu={menu} lado={lado}/>}
</React.Fragment>


const SimpleMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item">
        <label className="nav__link cursor" onClick={() => menu.onClick()}>
            {Icono && <Icono/>} {i18next.t(menu.keyLang || '')}
        </label>
    </li>)
};
const NavLinkMenu = ({menu}) => {
    const Icono = menu.icono;
    return (
        <li className="nav-item me-2">
            <NavLink className="navbar__link" href="#link" to={((menu || {}).nlOptions || {}).to || ''}>
                {Icono && <Icono/>} <span className="py-1">  {i18next.t(menu.keyLang || '')}  </span>
            </NavLink>
        </li>
    )
};
const DropdownMenu = ({menu, lado}) => {
    const Icono = menu.icono;
    return (
        <li className="nav-item dropdown me-2">
            <label className="navbar__link dropdown-toggle cursor" id="navbarDropdown" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                {Icono && <Icono/>} <span className="py-1">  {i18next.t(menu.keyLang || '')}  </span>
            </label>
            <div className={`dropdown-menu text-small ${lado === 'der' ? 'dropdown-menu-end' : 'dropdown-menu-start'}`}
                 aria-labelledby="navbarDropdown">
                {(menu.navlinks || []).map((nl, key) =>
                    (can(nl.permiso) || nl.publico) &&
                    <DropdownNl nl={nl} key={key}/>)}
            </div>
        </li>
    )
};
const DropdownNl = ({nl}) => {
    const Icono = nl.icono;
    return (
        <>
            {nl.tipo === 'simple' ? <label className="dropdown-item cursor" onClick={() => nl.onClick()}>
                    {Icono && <Icono/>} <span className="ms-2">{i18next.t(nl.keyLang || '')}</span>
                </label> :
                <NavLink className="dropdown-item" to={nl.to}>
                    {Icono && <Icono/>} <span className="ms-2">{i18next.t(nl.keyLang)}</span>
                </NavLink>}
            {nl.separador ? <hr className={"mt-2 pb-0 mb-0"}/> : null}
        </>
    );
}

export default Navbar;
