import React, {useEffect, useState} from 'react'
import Template from '../../Template/Template';
import Titulo from '../../Template/Titulo';
import {getAllGenerico, guardaGenerico} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from '../../../services/authService';
import i18next from "i18next";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import {RiHomeGearLine} from "react-icons/ri";
import {BiSave} from 'react-icons/bi';
import Campo from "../../Template/Campo";
import produce from "immer";
import {can} from "../../../services/seguridadService";


const Configuracion = () => {
    //|----------------|hooks|-----------------|//
    const [registros, setRegistros] = useState([]);
    //|------UseEffects------|//
    useEffect(() => cargarRegistros(), []);
    //|------DatosIniciales------|//
    const cargarRegistros = () => {
        getAllGenerico("tipo_configuracion", ['configuraciones']).then(res => {
            cerrarAlert();
            setRegistros(res);
        }).catch(noop());
    };
    //------Data------|//
    const onGuardar = (idx, ind) => {
        guardaGenerico('configuracion', registros[idx].configuraciones[ind])
            .then(res => cerrarAlert()).catch(noop());
    }
    //|------Render------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div className="container">
                        <Titulo titulo={i18next.t('admin:configuracion')} icono={RiHomeGearLine}/>
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap">
                        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
                            <div className="card-body p-3">
                                <div>
                                    <ul className="nav nav-tabs">
                                        {(registros || []).map((registro, idx) =>
                                            <li key={idx} className={`nav-item`}>
                                                <a className={`nav-link ${idx === 0 ? 'active' : ''}`}
                                                   data-toggle="tab"
                                                   role="tab"
                                                   href={`#${registro.nombre}`}>
                                                    {registro.nombre}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="tab-content pt-2">
                                    {(registros || []).map((registro, idx) =>
                                        <div key={idx} id={`${registro.nombre}`}
                                             className={`container-fluid tab-pane fade show ${idx === 0 ? 'active' : ''}`}
                                             role="tabpanel">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-condensed">
                                                    <Thead/>
                                                    <tbody>
                                                    {(registro.configuraciones || []).map((configuracion, ind) =>
                                                        <tr key={ind}>
                                                            <td>{configuracion.nombre}</td>
                                                            <td>{configuracion.descripcion}</td>
                                                            <td>
                                                                <Campo
                                                                    mostrarEtiqueta={false}
                                                                    containerClass="my-1"
                                                                    inputClass="form-control form-control-sm"
                                                                    value={configuracion.valor}
                                                                    maxLength={200}
                                                                    onChange={e => setRegistros(produce(registros, d => {
                                                                        d[idx].configuraciones[ind].valor = e.target.value;
                                                                    }))}/>
                                                            </td>
                                                            <td>
                                                                {can('admin.guardar_configuracion') &&
                                                                <button
                                                                    className={`btn ${can('admin.guardar_configuracion') ?
                                                                        'btn-outline-success' : 'btn-outline-danger'} my-1 p-1`}
                                                                    disabled={can('admin.guardar_configuracion') ? false : true}
                                                                    onClick={() => onGuardar(idx, ind)} Z>
                                                                    <BiSave/>
                                                                </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}
const Thead = () => {
    return (
        <thead>
        <tr>
            <th>{i18next.t('catalogos:nombre')}</th>
            <th>{i18next.t('catalogos:descripcion')}</th>
            <th>{i18next.t('catalogos:valor')}</th>
            <th></th>
        </tr>
        </thead>
    );
}
export default Configuracion;