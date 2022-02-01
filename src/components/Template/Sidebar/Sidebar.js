import React from 'react';
import {NavLink} from 'react-router-dom';
import SidebarData, {SIDE_ITEM, SIDE_BIGITEM, SIDE_SEPARADOR} from './SidebarData';
import './sidebar.css';
import i18next from "i18next";
import {can, getAccessToken} from "../../../services/seguridad.service";
import {isLogged} from "../../../services/authService";
import {getN} from "../../../services/jwtService";

const Sidebar = ({cerrarSidebar}) => {
    const esVisible = (item) => {
        if (!item.always_visible) {
            if (item.visible_con_sesion)
                return item.permiso !== undefined ? can(item.permiso) : isLogged()
            else
                return !isLogged();
        }
        return true;
    }
    return (
        <div className="sidebar animate__animated animate__fadeInLeft">
            <ul className="py-4 nav d-flex flex-column">
                {(SidebarData || []).map((item, idx) =>
                    <React.Fragment key={idx}>
                        {esVisible(item) && item.type === SIDE_ITEM &&
                        <Item item={item} cerrarSidebar={cerrarSidebar}/>}
                        {esVisible(item) && item.type === SIDE_BIGITEM &&
                        <BigItem item={item} cerrarSidebar={cerrarSidebar}/>}
                        {esVisible(item) && item.type === SIDE_SEPARADOR && <Separador/>}
                    </React.Fragment>
                )}
            </ul>
        </div>
    );
}

const Item = ({item = {}, cerrarSidebar}) => {
    const Icon = item.icon;
    return (<li className={`my-3`}>
        <div className='mx-4 '>
            <NavLink to={item.path} className='link sidebar__item'
                     onClick={() => {
                         cerrarSidebar();
                         if (item.onClick)
                             item.onClick();
                     }}>
                <div className='d-flex justify-content-between'>
                    <div className='txt-sidebar '>
                        {i18next.t(item.title)}
                        {item.path === "/miPerfil" && <span className='mx-3 fw-bold'>- {getN(getAccessToken())}</span>}
                    </div>
                    <div className='txt-sidebar '><Icon size={25}/></div>
                </div>
            </NavLink>
        </div>
    </li>);
}

const BigItem = ({item = {}, cerrarSidebar}) => {
    return (<li className={`my-2`}>
        <div className='mx-4'>
            <NavLink to={item.path} className='link sidebar__item' onClick={() => {
                cerrarSidebar();
                if (item.onClick)
                    item.onClick();
            }} style={{textDecoration: 'none'}}>
                <div className='d-flex justify-content-center'>
                    <div className='txt-sidebar'>
                        {i18next.t(item.title)}

                    </div>
                </div>
            </NavLink>
        </div>
    </li>);
}

const Separador = () => <div className='w-100 px-5 my-1'>
    <hr className="w-100"/>
</div>;

export default Sidebar;
