import React from 'react';
import TablaJson from "../../Template/TablaJson/TablaJson";
import {activarUsuario, eliminaUsuario, inactivarUsuario} from "../../../api/usuariosApi";
import {cerrarAlert, seguroContinuar} from "../../../services/swalService";
import BotonIcono from "../../Template/Botones/BotonIcono";
import {FaLock, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import i18next from "i18next";
import ModalCambiarPassword from "../../Modales/ModalCambiarPassword";
import {setRegistroPassword} from "../../../store/usuarioStore";
import {Modal} from "bootstrap";
import {useStore} from "../../../index";

const Listado = ({usuarios_all, usuario, setUsuario, metadata, onRefresh}) => {

    const eliminarUsuario = (usu) => {
        seguroContinuar().then(res => {
            if (res.isConfirmed) {
                eliminaUsuario(usu.id).then(r => {
                    cerrarAlert();
                    onRefresh();
                });
            }
        })

    }

    return (
        <div>
            <TablaJson metadata={metadata}
                       acciones={Acciones}
                       onEliminar={eliminarUsuario}
                       registros_all={usuarios_all}
                       seleccionado={usuario}
                       setSeleccionado={setUsuario}
                       onRefresh={onRefresh}
                       container_class='z-depth-2 '/>
        </div>
    );
};

const Acciones = ({registro, onRefresh}) => {
    const lauchModal=()=>{
        setRegistroPassword(registro)
        let editor=new Modal(document.getElementById('modalCambiarPassword'));
        useStore.setState({modalCambiarPassword: editor});
        useStore.getState().modalCambiarPassword.show();
    }
    return (<>
        <button className='btn btn-outline-info btn-sm'
                type="button"
                onClick={() =>lauchModal()}>
            <FaLock/><span className="ms-1">{i18next.t('usuario:cambiarPassword')}</span>
        </button>
        <ModalCambiarPassword/>
    </>)
}

export default Listado;
