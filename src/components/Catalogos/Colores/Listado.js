import React, {useEffect, useState} from 'react';
import filtrarArreglo from "../../../services/filterService";
import {FaChevronUp, FaChevronDown,AiOutlineCheckSquare,AiOutlineCloseSquare} from "react-icons/all";
import ordenarArrPorKey from "../../../services/sortService";
import BotonBuscar from "../../Template/Botones/BotonBuscar";
import BotonCopiarPortapapeles from "../../Template/Botones/BotonCopiarPortapapeles";
import BotonNuevoRegistro from "../../Template/Botones/BotonNuevoRegistro";
import BotonEditar from "../../Template/Botones/BotonEditar";
import BotonEliminar from "../../Template/Botones/BotonEliminar";
import {eliminaGenerico} from "../../../api/catalogosApi";
import {noop} from "../../../services/generalService";
import {seguroContinuar} from "../../../services/swalService";
import i18next from "i18next";
import {can} from "../../../services/seguridad.service";

const Listado = ({registrosAll, setSeleccionado, onEliminar}) => {
//|------Hooks/Constantes------|//
    const [filtro, setFiltro] = useState({});
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [registros, setRegistros] = useState(registrosAll);
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

//|------API------|//
    const eliminarRegistro = registro_id => {
        seguroContinuar().then(value => {
            if (value.isConfirmed) {
                eliminaGenerico('tipo_configuracion', registro_id).then(() => onEliminar()).catch(noop());
                setSeleccionado({});
            }
        });
    };

//|------GUI------|//
    const filtrarRegistros = () => setRegistros(ordenarArrPorKey(filtrarArreglo(registrosAll, filtro), sort.key, sort.order));
    const ordenarRegistros = () => setRegistros(ordenarArrPorKey(registros, sort.key, sort.order));

    return (
        <div className='flex-sm-grow-1'>
            <div className=' z-depth-3'>
                <div className='card-header d-flex justify-content-between bg-xh-secondary'>
                    <div className='text-titulos'>{i18next.t('catalogos:registrosExistentes')}</div>
                    <div className='d-flex justify-content-end'>
                        <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>
                        <BotonCopiarPortapapeles/>
                        <BotonNuevoRegistro onNuevoRegistro={() => setSeleccionado({})}/>
                    </div>
                </div>
                <div className='card-body py-0 px-0' id='divTabla'>
                    <table className='table table-condensed '>
                        <TheadTitulos sort={sort} setSort={setSort}/>
                        {ver_buscadores && <TheadBuscador  filtro={filtro} setFiltro={setFiltro}/>}
                        <tbody className="text-subtitulos">
                        {(registros || []).map((reg, idx) => <tr key={idx}>
                            <td>{reg.id}</td>
                            <td>{reg.nombre}</td>
                            <td><div className='color-border' style={{borderLeftColor: reg.color}}>{reg.color}</div></td>
                            <td className="text-center">{reg.activo?<AiOutlineCheckSquare size={20} color="green"/>:<AiOutlineCloseSquare size={20} color="red"/>}</td>
                            <td className='d-flex justify-content-end flex-nowrap'>
                                {can('catalogos.guardar_colores') && <BotonEditar onClick={() => setSeleccionado(reg)}/>}
                                {can('catalogos.guardar_colores') && <BotonEliminar onClick={() => eliminarRegistro(reg.id)}/>}
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

//|------Subcomponentes------|//
const TheadTitulos = ({sort, setSort}) => {
    const handleSort = key => {
        if (key === sort.key)
            setSort({...sort, order: sort.order === 'asc' ? 'desc' : 'asc'});
        else
            setSort({key, order: 'asc'});
    };
    return (<thead className='text-white thead-admin'>
    <tr>
        <th className='text-center cursor'
            onClick={() => handleSort('id')}>
            <IconosSort key_sort={'id'} key_actual={sort.key} order={sort.order}/>
            {i18next.t('catalogos:id')}
        </th>
        <th className='text-center cursor'
            onClick={() => handleSort('nombre')}>
            <IconosSort key_sort={'nombre'} key_actual={sort.key} order={sort.order}/>
            {i18next.t('catalogos:nombre')}
        </th>
        <th className="text-center">{i18next.t('catalogos:Vista')}</th>
        <th className="text-center">{i18next.t('catalogos:activo')}</th>
        <th></th>
    </tr>
    </thead>);
}
const TheadBuscador = ({filtro, setFiltro}) => {
    return (<thead className='text-white thead-admin'>
    <tr>
        <th className='py-1'>
            <input className='form-control form-control-sm' value={filtro.id || ""}
                   onChange={(e) => setFiltro({...filtro, id: e.target.value})}/>
        </th>
        <th className='py-1'>
            <input className='form-control form-control-sm' value={filtro.nombre || ""}
                   onChange={(e) => setFiltro({...filtro, nombre: e.target.value})}/>
        </th>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    </thead>);
}

const IconosSort = ({key_actual, key_sort, order}) => {
    return (<React.Fragment>
        {key_sort === key_actual && order === 'asc' && <FaChevronUp/>}
        {key_sort === key_actual && order === 'desc' && <FaChevronDown/>}
    </React.Fragment>);
}

export default Listado;
