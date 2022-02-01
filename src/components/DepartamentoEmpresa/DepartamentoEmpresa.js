import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import Titulo from "../Template/Titulo";
import {MdOutlineMapsHomeWork} from "react-icons/md";
import i18next from "i18next";
import Listado from "./Listado";
import Detalle from "./Detalle";
import {getMultiActivosGenerico} from "../../api/catalogosApi";
import {cerrarAlert} from "../../services/swalService";
import {ControlPropiedadModel} from "../../models/controlPropiedad";
import {AiFillFileAdd} from "react-icons/ai";
import {getDepartamentosEmpresas} from "../../api/relDepartamentoEmpresaApi";
import {getAllUsuarios} from "../../api/usuariosApi";

const DepartamentoEmpresa = () => {
    //|------Hooks/Constantes------|//
    const [seleccionado, setSeleccionado] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const catalogos = [
        {nombre: 'departamento', relaciones: []},
        {nombre: 'empresa', relaciones: []},
    ];
    //|------useEffect------|//
    useEffect(() => {
        getMultiActivosGenerico(catalogos).then(res => {
            setDepartamentos(res.departamento.data);
            setEmpresas(res.empresa.data);
            cerrarAlert();
        });
        getAllUsuarios().then(res => {
            cerrarAlert();
            setUsuarios(res)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        consultarPropiedades();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //|------funciones------|//
    const consultarPropiedades = () => {
        getDepartamentosEmpresas().then(res => {
            cerrarAlert();
            setRegistros(res);
        })
    }

    return (
        <Template>
            <div className='d-flex flex-column'>
                <div className="d-flex justify-content-around">
                    <div>
                        <Titulo icono={MdOutlineMapsHomeWork}
                                titulo={i18next.t('navbar:departamentoEmpresa')}/>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-outline-info"
                                onClick={() => setSeleccionado(ControlPropiedadModel)}>
                            <AiFillFileAdd/>
                            {i18next.t('general:nuevoRegistro')}
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-around bg-light">
                    <div className='col-sm-12 col-md-6 col-lg-8 py-2'>
                        <Listado seleccionado={seleccionado}
                                 setSeleccionado={setSeleccionado}
                                 registrosAll={registros}/>
                    </div>
                    {seleccionado !== null &&
                    <div className="col-sm-12 col-md-6 col-lg-3 py-2">
                        <Detalle seleccionado={seleccionado}
                                 setSeleccionado={setSeleccionado}
                                 departamentos={departamentos}
                                 empresas={empresas}
                                 usuarios={usuarios}
                                 onRefresh={consultarPropiedades}
                        />
                    </div>}
                </div>
            </div>
        </Template>
    );
};
export default DepartamentoEmpresa;