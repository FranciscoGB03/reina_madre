import React, {useState, useEffect} from 'react';
import {FaUserTie, FaTrashAlt} from 'react-icons/fa';
import {cerrarAlert, ocultableDanger} from '../../../services/swalService';
import {guardarRolUsuarios} from '../../../api/adminApi';
import Boton from '../../Template/Boton';
import i18next from "i18next";
import {can} from '../../../services/seguridad.service';
import {useStore} from "../../../index";
import {setSeleccionado} from "../../../store/appsStore";
import {Typeahead} from "react-bootstrap-typeahead";
import {FaSave} from "react-icons/fa";
import {cargarAsignarPermisos} from "../../../store/permisosAdminStore";

const UsuariosAsignados = () => {
    const usuarios=useStore.getState().usuarios;
    const seleccionado = useStore.getState().seleccionado;
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {
        if (typeof usuarioSeleccionado?.id !== "undefined") {
            let busqueda = seleccionado.usuarios.findIndex(usuario => usuario.nombre === usuarioSeleccionado.nombre);
            if (busqueda === -1) {
                let usuarios = seleccionado.usuarios.push(usuarioSeleccionado);
                setSeleccionado({usuarios: usuarios});
                setUsuarioSeleccionado(null);
            } else {
                ocultableDanger(i18next.t('general:errorUsuario'));
                setUsuarioSeleccionado(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuarioSeleccionado]);

    const eliminaUsuario = (indice) => {
        let usuarios = seleccionado.usuarios.splice(indice, 1);
        setSeleccionado({usuarios: usuarios})
    }
    const guardarDatos = () => {
        guardarRolUsuarios(seleccionado).then(() => {
            cargarAsignarPermisos()
            cerrarAlert();
        });
    };
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <div className="card-header d-flex justify-content-between text-center py-0">
                <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                    <i className="py-2 px-2">{i18next.t('admin:usuariosAsig')}</i>
                </h5>
            </div>
            <div className="card-body p-0">
                <div id="div_tabla">
                    <div>
                        <div className="text-center mx-2 d-flex text-nowrap">
                            <div className="mt-1">
                                <Typeahead id='usuario'
                                           labelKey='nombre'
                                           options={usuarios || []}
                                           onChange={t => setUsuarioSeleccionado(t[0])}
                                           selected={usuarioSeleccionado ? [usuarioSeleccionado] : []}/>
                            </div>
                        </div>
                        <div>
                            {(seleccionado.usuarios|| []).map((usuario, idx) =>
                                <div className={"cursor text-center mx-2"} key={idx}>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex justify-content-start">
                                            <div className="my-1 mr-1">
                                                <span><FaUserTie/></span>
                                            </div>
                                            <div className="my-1">
                                                {usuario.nombre}
                                            </div>
                                        </div>
                                        <div>
                                            <Boton key_texto=""
                                                   className="btn-outline-danger my-1 p-0"
                                                   habilitado={true}
                                                   ejecuta={() => eliminaUsuario(idx)}>
                                                <FaTrashAlt/>
                                            </Boton>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="my-2 mx-2">
                            <button className={`btn ${can('admin.guardar_usuarios')?'btn-outline-success w-100':'btn-outline-danger w-100'}`}
                                    disabled={can('admin.guardar_usuarios')?false:true}
                                    onClick={()=>guardarDatos()}>
                                <FaSave/> {i18next.t("general:guardar")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UsuariosAsignados;
