import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import SidebarAdmin from '../Admin/SidebarAdmin/SidebarAdmin';
import {FaChevronCircleRight} from "react-icons/fa";
import {isLogged} from "../../services/authService";
import {can} from "../../services/seguridad.service";
import SinPermiso from "./SinPermiso";

const AdminTemplate = (props) => {
    const [mostrar, setMostrar] = useState(true);

    return (
        isLogged() && can('admin.ver_admin') ? <div>
            <Navbar/>
            <div className="row p-0 m-0 d-flex flex-nowrap" style={{overflowX:'scroll'}}>
                {mostrar ? <div className='sidebarAdmin col-8 col-md-2'>
                        <SidebarAdmin mostrar={mostrar} setMostrar={setMostrar}/>
                    </div> :
                    <div className='btn circle link' onClick={() => setMostrar(true)}>
                        <FaChevronCircleRight/>
                    </div>}
                <div className="col-12 col-md-10">
                    {props.children}
                </div>
            </div>
        </div>: <SinPermiso/>
    );
}
const Navbar = () => {
    return (
        <nav className="navbar navbar__background navbar-expand-lg sticky-top">
            <NavLink to="/" className="nav-link navbar__link navbar-brand" href="#">
                <Env env={process.env.REACT_APP_ENV}/>
            </NavLink>

        </nav>
    );
}

const Env = ({env}) => {
    if (env !== 'prod') {
        const tipo_badge = env === 'dev' ? 'warning' : 'danger';
        return (<span className={`p-1 ms-1 badge badge-${tipo_badge}`}>{env}</span>);
    }
    return ('');
};

export default AdminTemplate;
