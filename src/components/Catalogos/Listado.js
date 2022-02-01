import React, {useState, useEffect} from 'react';
import {ordenarArrPorKey} from '../../services/sortService';
import i18next from "i18next";
import {limpiaSeleccionado, setSeleccionado} from "../../store/generalStore";
import BotonBuscar from "../Template/Botones/BotonBuscar";
import BotonCopiarPortapapeles from "../Template/Botones/BotonCopiarPortapapeles";
import BotonNuevoRegistro from "../Template/Botones/BotonNuevoRegistro";
import BotonEditar from "../Template/Botones/BotonEditar";
import filtrarArreglo from "../../services/filterService";
import {useStore} from "../../index";
import IconosSort from "../Template/Tablas/IconosSort";
import _ from "lodash";
import {deepValue} from "../../services/propertiesService";
import {can} from "../../services/seguridad.service";
import CloudinaryWidget from "../Template/CloudinaryWidget/CloudinaryWidget";
import BotonIcono from "../Template/Botones/BotonIcono";
import {BsCloudUpload} from 'react-icons/bs';
import {FaImage, FaTrash} from "react-icons/fa";
import {guardaGenerico} from "../../api/catalogosApi";
import {cerrarAlert} from "../../services/swalService";
import {noop} from "../../services/generalService";
import {cargarSoloCatalogoEnItems, eliminarCatalogo} from "../../store/catalogosStore";
import Lightbox from 'react-image-lightbox';

const Listado = () => {
    //|------Hooks/Constantes------|//
    const catalogo = useStore().catalogo;
    const registrosAll = useStore.getState().items;
    const [registros, setRegistros] = useState(registrosAll);
    const [filtro, setFiltro] = useState({});
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [ver_buscadores, setVerBuscadores] = useState(false);
    const [ver_imagen, setVerImagen] = useState(false);
    const [imagen_src, setImagenSrc] = useState('');

    //|------useEffect------|//
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
    const handleSucessImagen = (reg_id, cloudinary_info) => {
        const imagen_uuid = cloudinary_info.public_id;
        guardaGenerico(catalogo.key, {id: reg_id, imagen_uuid}).then(() => {
            cerrarAlert();
            cargarSoloCatalogoEnItems();
        }).catch(noop);
    }

    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <div className=" card-header d-flex justify-content-between text-center py-0">
                <h5 className="text-center text-titulo-tabla pt-2">
                    <i className="py-2 px-2">{i18next.t('catalogos:registrosExistentes')}</i>
                </h5>
                <div className='d-flex justify-content-end text-titulo-tabla mt-2'>
                    <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>
                    <BotonCopiarPortapapeles div_tabla="div_tabla"/>
                    <BotonNuevoRegistro onNuevoRegistro={() => limpiaSeleccionado()}/>
                </div>
            </div>
            <div className="card-body p-0">
                <div id="div_tabla">
                    <table className=" table table-condensed responsive hover ">
                        <TheadTitulos sort={sort} setSort={setSort}/>
                        {ver_buscadores && <TheadBuscador filtro={filtro} setFiltro={setFiltro}/>}
                        <tbody className="text-subtitulos">
                        {(registros || []).map((reg, idx) => <tr key={idx}>
                            {(catalogo?.campos || []).map(campo =>
                                campo?.ver_en_tabla && <td key={campo?.key}>{deepValue(campo.display, reg)}</td>
                            )}
                            <td>
                                {can(catalogo?.permiso_guardar) &&
                                <div className='d-flex justify-content-end flex-nowrap'>
                                    <BotonEditar onClick={() => setSeleccionado(reg)}/>
                                    {catalogo?.cl_requerido &&
                                    <BotonIcono icono={FaImage}
                                                texto={i18next.t('catalogos:verImagen')}
                                                onClick={() => {
                                                    setImagenSrc(process.env.REACT_APP_URL_CLOUDINARY + '/' + reg.imagen_uuid);
                                                    setVerImagen(true);
                                                }}/>}
                                    {catalogo.cl_requerido &&
                                    <CloudinaryWidget onSuccess={(info) => handleSucessImagen(reg.id, info)}
                                                      preset='catalogos'>
                                        <BotonIcono texto={i18next.t('catalogos:reemplazarImagen')}
                                                    icono={BsCloudUpload}/>
                                    </CloudinaryWidget>}
                                    {catalogo?.eliminar &&
                                    <BotonIcono icono={FaTrash}
                                                texto={i18next.t('catalogos:eliminar')}
                                                onClick={() => eliminarCatalogo(reg.id)}/>}
                                </div>
                                }
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {ver_imagen && <Lightbox mainSrc={imagen_src} onCloseRequest={() => setVerImagen(!ver_imagen)}/>}
        </div>
    );
}
//|------Subcomponentes------|//
const TheadTitulos = ({sort, setSort}) => {
    const catalogo = useStore().catalogo;
    const handleSort = key => {
        if (key === sort.key)
            setSort({...sort, order: sort.order === 'asc' ? 'desc' : 'asc'});
        else
            setSort({key, order: 'asc'});
    };
    return (
        <thead className=''>
        <tr>
            {(catalogo?.campos || []).map(campo =>
                campo?.ver_en_tabla &&
                <th className='text-center cursor' key={campo.sort_key}
                    onClick={() => handleSort(campo.sort_key)}>
                    <IconosSort key_sort={campo.sort_key} key_actual={sort.key} order={sort.order}/>
                    {i18next.t(campo.label)}
                </th>)}
            <th></th>
        </tr>
        </thead>
    );
}
const TheadBuscador = ({filtro, setFiltro}) => {
    const catalogo = useStore().catalogo;
    const handleChange = (campo, value) => {
        const nuevo_obj = _.update(filtro, campo.buscador_key, () => value);
        setFiltro({...nuevo_obj});
    }
    return (
        <thead className=''>
        <tr>
            {(catalogo?.campos || []).map(campo =>
                (campo?.ver_en_tabla && campo?.show_buscador) && <th className="py-1" key={campo?.buscador_key}>
                    <input className='form-control form-control-sm' value={deepValue(campo.buscador_key, filtro) || ""}
                           placeholder={i18next.t('catalogos:buscar')}
                           onChange={(e) =>
                               handleChange(campo, e.target.value)
                           }/>
                </th>)}
            <th></th>
        </tr>
        </thead>);
}


export default Listado;
