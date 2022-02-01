import React, {useEffect, useState} from 'react';
import i18next from "i18next";
import BotonBuscar from "../Template/Botones/BotonBuscar";
import BotonCopiarPortapapeles from "../Template/Botones/BotonCopiarPortapapeles";
import BotonIcono from "../Template/Botones/BotonIcono";
import {BiEdit} from "react-icons/bi";
import {ordenarArrPorKey} from "../../services/sortService";
import filtrarArreglo from "../../services/filterService";

const Listado = ({ registrosAll,seleccionado, setSeleccionado}) => {
    //|------Hooks/Constantes------|//
    const [registros, setRegistros] = useState(registrosAll);
    const [filtro, setFiltro] = useState({});
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [ver_buscadores, setVerBuscadores] = useState(false);
    //|------UseEffects-------|//
    useEffect(() => {
        filtrarRegistros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrosAll, filtro]);
    useEffect(() => {
        ordenarRegistros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);
//|------GUI------|//
    const filtrarRegistros = () => setRegistros(ordenarArrPorKey(filtrarArreglo(registrosAll, filtro), sort.key, sort.order));
    const ordenarRegistros = () => setRegistros(ordenarArrPorKey(registros, sort.key, sort.order));

    return (
        <div className=''>
            <div className='card z-depth-3 border-tabla'>
                <div className='card-header d-flex justify-content-between bg-xh-secondary'>
                    <h5 className='text-titulo-tabla'>{i18next.t('catalogos:registrosExistentes')}</h5>
                    <div className='d-flex text-titulo-tabla justify-content-end'>
                        <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>
                        <BotonCopiarPortapapeles/>
                    </div>
                </div>
                <div className='card-body py-0 px-0' id='divTabla'>
                    <div className="table-responsive">
                        <table className='table table-condensed'>
                            <TheadTitulos/>
                            {ver_buscadores && <TheadBuscador filtro={filtro} setFiltro={setFiltro}/>}
                            <tbody>
                            {(registros || []).map((reg, idx) =>
                                <tr key={idx}
                                    className={`${seleccionado?.id === reg.id ? 'seleccionado' : ''}`}>
                                    <td>{reg.empresa?.nombre}</td>
                                    <td>{reg.departamento?.nombre}</td>
                                    <td>{reg.usuario?.nombre}</td>
                                    <td className="text-center">
                                        <BotonIcono texto={i18next.t('general:editar')}
                                                    icono={BiEdit}
                                                    onClick={() => setSeleccionado(reg)}/>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
//|------Subcomponentes------|//
const TheadTitulos = () => {
    return (
        <thead className='thead-admin'>
        <tr>
            <th>{i18next.t('propiedad:Empresa')}</th>
            <th>{i18next.t('propiedad:Departamento')}</th>
            <th>{i18next.t('propiedad:Usuario')}</th>
        </tr>
        </thead>);
}
const TheadBuscador = ({filtro, setFiltro}) => {
    return (<thead className='text-white thead-admin'>
    <tr>
        <th className='py-1'>
            <input className='form-control form-control-sm' value={filtro.empresa?.nombre || ""}
                   onChange={(e) => setFiltro({...filtro, empresa: {nombre:e.target.value}})}/>
        </th>
        <th className='py-1'>
            <input className='form-control form-control-sm' value={filtro.departamento?.nombre || ""}
                   onChange={(e) => setFiltro({...filtro, departamento:{nombre: e.target.value}})}/>
        </th>
        <th className='py-1'>
            <input className='form-control form-control-sm' value={filtro.usuario?.nombre || ""}
                   onChange={(e) => setFiltro({...filtro, usuario:{nombre: e.target.value}})}/>
        </th>
    </tr>
    </thead>);
}
export default Listado;