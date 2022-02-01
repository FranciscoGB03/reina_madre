import React, {useState, useEffect} from 'react';
import Titulo from "../../Template/Titulo";
import {FaUserTie} from "react-icons/fa";
import i18next from "i18next";
import Listado from "./Listado";
import Detalle from "./Detalle";
import {getAllUsuarios} from "../../../api/usuariosApi";
import {cerrarAlert} from "../../../services/swalService";
import {METADATA} from './tablaData';
import {getMultiActivosGenerico} from "../../../api/catalogosApi";
import Template from "../../Template/Template";

const Usuarios = () => {
    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        getMultiActivosGenerico(METADATA.cats).then(res_cats => {
            let nuevos_cats = {};
            Object.entries(res_cats).map(pos => nuevos_cats[pos[0]] = pos[1].data);
            setCats(nuevos_cats);
        });
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
        getAllUsuarios().then(r => {
            cerrarAlert();
            setUsuarios(r);
        });
    }

    return (
        <Template>
            <div className='d-flex flex-column'>
                <Titulo icono={FaUserTie} titulo={i18next.t('admin:usuarios')}/>
                <div className='d-flex justify-content-around'>
                    <Listado usuarios_all={usuarios} usuario={usuario} setUsuario={setUsuario} metadata={METADATA}
                             onRefresh={cargarUsuarios}/>
                    {usuario !== null &&
                    <Detalle metadata={METADATA} seleccionado={usuario} setSeleccionado={setUsuario} cats={cats}
                             onRefresh={cargarUsuarios}/>}
                </div>
            </div>
        </Template>
    );
};

export default Usuarios;
