import React from 'react';
import i18next from "i18next";
import EsNuevoEdit from "../Template/EsNuevoEdit";
import Select from "../Template/Select";
import produce from "immer";
import {cerrarAlert} from "../../services/swalService";
import {guardarDepartamento} from "../../api/relDepartamentoEmpresaApi";

const Detalle = ({seleccionado, setSeleccionado, departamentos, empresas, usuarios, onRefresh}) => {
    const guardar = () => {
        guardarDepartamento(seleccionado).then(() => {
            cerrarAlert();
            onRefresh()
            setSeleccionado(null);
        })
    }
    return (
        <div className="card border-tabla z-depth-2">
            <div className="card-header d-flex justify-content-between py-0">
                <h5 className="text-center text-titulo-tabla pt-2">
                    <i className="py-2 px-2">{i18next.t('propiedad:detallePropiedad')}</i>
                </h5>
                <div className="d-flex text-titulo-tabla justify-content-center mt-2">
                    <EsNuevoEdit es_nuevo={seleccionado?.id == null}/>
                </div>
            </div>
            <div className="m-2 d-flex flex-wrap flex-column">
                <div className="d-flex">
                    <label className="mx-2">{i18next.t('propiedad:empresa')}:</label>
                    <div>
                        <Select options={empresas}
                                className="form-select-sm form-select"
                                selected={seleccionado.empresa || ''}
                                onSelect={e => setSeleccionado(produce(seleccionado, d => void (d.empresa = e)))}/>
                    </div>
                </div>
                <div className="d-flex mt-1">
                    <label className="mx-2">{i18next.t('propiedad:Departamento')}:</label>
                    <div>
                        <Select options={departamentos}
                                className="form-select-sm form-select"
                                selected={seleccionado.departamento || ''}
                                onSelect={e => setSeleccionado(produce(seleccionado, d => void (d.departamento = e)))}/>
                    </div>
                </div>
                <div className="d-flex mt-1">
                    <label className="mx-2">{i18next.t('propiedad:usuario')}:</label>
                    <div>
                        <Select options={usuarios}
                                className="form-select-sm form-select"
                                selected={seleccionado.usuario || ''}
                                onSelect={e => setSeleccionado(produce(seleccionado, d => void (d.usuario = e)))}/>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-outline-success"
                            onClick={() => guardar()}>
                        {i18next.t('general:guardar')}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Detalle;