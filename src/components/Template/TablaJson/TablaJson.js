import React, {useEffect, useState} from 'react';
import i18next from "i18next";
import {noop} from "../../../services/generalService";
import CardHeader from "./CardHeader";
import {deepValue} from "../../../services/propertiesService";
import {can} from "../../../services/seguridad.service";
import BotonEditar from "../Botones/BotonEditar";
import TheadTitulos from "./TheadTitulos";
import TheadBuscador from "./TheadBuscador";
import {ordenarArrPorKey} from "../../../services/sortService";
import filtrarArreglo from "../../../services/filterService";
import {FaTrash} from "react-icons/fa";
import BotonIcono from "../Botones/BotonIcono";

const TablaJson = ({
                       acciones = null,
                       container_class = '',
                       metadata = {},
                       onEliminar = noop,
                       registros_all = [],
                       seleccionado = {},
                       seleccionado_class = 'rgba-red-slight',
                       setSeleccionado = noop,
                       table_class = 'table table-condensed responsive table-hover',
                       titulo_card = i18next.t('catalogos:registrosExistentes'),
                       titulo_class = 'text-center text-titulo-tabla txts_gray pt-2',
                       ver_boton_buscadores = true,
                       ver_boton_copiar = true,
                       ver_boton_nuevo = true,
                       ver_card_header = true,
                       onRefresh = () => {
                       }
                   }) => {

    //|-------Hooks-------|//
    const Acciones = acciones;
    const [filtro, setFiltro] = useState({});
    const [registros, setRegistros] = useState([]);
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [ver_buscadores, setVerBuscadores] = useState(false);

    //|------useEffect------|//
    useEffect(() => {
        filtrarRegistros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registros_all, filtro]);
    useEffect(() => {
        ordenarRegistros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    //|------GUI------|//
    const filtrarRegistros = () => setRegistros(ordenarArrPorKey(filtrarArreglo(registros_all, filtro), sort.key, sort.order));
    const ordenarRegistros = () => setRegistros(ordenarArrPorKey(registros, sort.key, sort.order));

    return (
        <div className={`card ${container_class} me-5`}>
            {ver_card_header && <CardHeader titulo_card={titulo_card}
                                            titulo_class={titulo_class}
                                            setSeleccionado={setSeleccionado}
                                            setVerBuscadores={setVerBuscadores}
                                            ver_boton_buscadores={ver_boton_buscadores}
                                            ver_boton_copiar={ver_boton_copiar}
                                            ver_boton_nuevo={ver_boton_nuevo}
                                            ver_buscadores={ver_buscadores}/>}
            <div className="card-body p-0">
                <div id="div_tabla">
                    <table className={table_class}>
                        <TheadTitulos metadata={metadata} sort={sort} setSort={setSort}/>
                        {ver_buscadores && <TheadBuscador metadata={metadata} filtro={filtro} setFiltro={setFiltro}/>}
                        <tbody className="text-subtitulos">
                        {(registros || []).map((reg, idx) => <tr key={idx}
                                                                 className={reg?.id === seleccionado?.id ? seleccionado_class : ''}>
                            {(metadata?.campos || []).map(campo =>
                                campo?.ver_en_tabla && <td key={campo?.key}>
                                    {(campo?.display || '') !== '' ?
                                        deepValue(campo.display, reg) :
                                        <campo.display_component registro={reg}/>}
                                </td>
                            )}
                            <td>
                                <div  className='d-flex justify-content-end flex-nowrap'>
                                    {acciones && <Acciones registro={reg} onRefresh={onRefresh}/>}
                                    {(metadata?.permiso_editar === null || can(metadata?.permiso_editar)) &&
                                    <BotonEditar onClick={() => setSeleccionado(reg)}/>}
                                    {(metadata?.permiso_eliminar === null || can(metadata?.permiso_eliminar)) &&
                                    <BotonIcono icono={FaTrash}
                                                texto={i18next.t('catalogos:eliminar')}
                                                onClick={() => onEliminar(reg)}/>}
                                    {/*            {catalogo?.cl_requerido &&*/}
                                    {/*            <BotonIcono icono={FaImage}*/}
                                    {/*                        texto={i18next.t('catalogos:verImagen')}*/}
                                    {/*                        onClick={() => {*/}
                                    {/*                            setImagenSrc(process.env.REACT_APP_URL_CLOUDINARY + '/' + reg.imagen_uuid);*/}
                                    {/*                            setVerImagen(true);*/}
                                    {/*                        }}/>}*/}
                                    {/*            {catalogo.cl_requerido &&*/}
                                    {/*            <CloudinaryWidget onSuccess={(info) => handleSucessImagen(reg.id, info)}*/}
                                    {/*                              preset='catalogos'>*/}
                                    {/*                <BotonIcono texto={i18next.t('catalogos:reemplazarImagen')}*/}
                                    {/*                            icono={BsCloudUpload}/>*/}
                                    {/*            </CloudinaryWidget>}*/}
                                </div>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*{ver_imagen && <Lightbox mainSrc={imagen_src} onCloseRequest={() => setVerImagen(!ver_imagen)}/>}*/}
        </div>
    );
};


export default TablaJson;
