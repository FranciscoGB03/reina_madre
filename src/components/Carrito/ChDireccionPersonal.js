import React, {useEffect, useState} from 'react';
import {isLogged} from "../../services/authService";
import {FaChevronRight, FaPlusCircle, FaTruck} from "react-icons/fa";
import i18next from "i18next";
import {Link} from "react-router-dom";
import {getDirecciones, guardaDireccion, guardarAnonimo} from "../../api/usuariosApi";
import {cerrarAlert} from "../../services/swalService";
import DatePicker from "../Template/Template/DatePicker";
import moment from "moment";
import {ANYOS_MAYOR_EDAD} from "../../constants/usuarios";
import CrearDireccion from "../Usuario/Direcciones/CrearDireccion";
import {sch_contacto, sch_direccion} from "../../validators";
import ListadoErrores from "../Template/Template/ListadoErrores";
import {isEmailValid} from "../../services/generalService";
import {useStore} from "../../index";
import {launchModalIniciarSesion} from "../Template/Template/Sidebar/SidebarData";

const ChDireccionPersonal = ({direccion, setDireccion, info_personal, setInfoPersonal, bloquear}) => {
    const control = useStore.getState().control;
    const [direcciones, setDirecciones] = useState([]);
    const [errores, setErrores] = useState([]);
    const [ver_errores, setVerErrores] = useState(false);

    useEffect(() => {
        if (isLogged())
            cargarDirecciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLogged())
            cargarDirecciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control]);

    useEffect(() => {
        sch_contacto.validate(info_personal, {abortEarly: false})
            .then(() => {
                if (!isEmailValid(info_personal.email))
                    setErrores([i18next.t('error:ingreseEmailValido')]);
                else
                    sch_direccion.validate(direccion, {abortEarly: false})
                        .then(() => setErrores([]))
                        .catch(err => setErrores(err.errors))
            })
            .catch(err => setErrores(err.errors));
    }, [direccion, info_personal]);

    const cargarDirecciones = () => {
        setDireccion({});
        getDirecciones().then(r => {
            cerrarAlert();
            setDirecciones(r);
        })
    }

    const guardarDirEInfo = () => {
        if (errores.length === 0)
            guardarAnonimo(info_personal).then(res => {
                setInfoPersonal(res);
                guardaDireccion(null, direccion, false, false).then(res => {
                    cerrarAlert();
                    setDireccion(res);
                });
            })
        else
            setVerErrores(true);
    }

    return (
        <div>
            {isLogged() ?
                <PanelDirecciones direcciones={direcciones} direccion={direccion}
                                  bloquear={bloquear}
                                  setDireccion={setDireccion}/> :
                <UsuarioNoRegistrado direccion={direccion} setDireccion={setDireccion} bloquear={bloquear}
                                     info_personal={info_personal} setInfoPersonal={setInfoPersonal}
                                     errores={errores} ver_errores={ver_errores}
                                     onGuardar={guardarDirEInfo}/>
            }
        </div>
    );
};

const PanelDirecciones = ({direcciones, setDireccion, direccion, bloquear = false}) => {
    return (<div className='d-flex flex-column  m-2 p-2 px-4 z-depth-1'>
        <h5><FaTruck/> {i18next.t('articulo:elijaDireccion')}</h5>
        <Link to='/miPerfil' className='cursor d-flex flex-nowrap'>
            <FaPlusCircle className='mt-1 mx-2'/>
            {i18next.t('articulo:agregarDireccion')}
        </Link>
        {(direcciones || []).map(d =>
            <Direccion key={d.id} dir={d} selected={direccion}
                       setDireccion={dir => {
                           if (!bloquear)
                               setDireccion(dir)
                       }}/>
        )}
    </div>)
}

const UsuarioNoRegistrado = ({bloquear, direccion, setDireccion, info_personal, setInfoPersonal, errores, ver_errores, setVerErrores, onGuardar}) => {
    return (<div className='d-flex flex-column m-2 p-2 px-4 z-depth-1'>
        <div className='d-flex justify-content-between'>
            <h4 className='mt-1'>{i18next.t('articulo:datosContacto')}</h4>
            {!isLogged() && <label className='link cursor'
                                   onClick={() => launchModalIniciarSesion()}>
                {i18next.t('articulo:yaSesion')}
            </label>}
        </div>
        <InfoPersonal bloquear={bloquear} info_personal={info_personal} setInfoPersonal={setInfoPersonal}/>
        <br/>
        {(bloquear || direccion?.id) ? <Direccion dir={direccion} selected={direccion}/> :
            <CrearDireccion bloquear={bloquear} direccion={direccion} setDireccion={setDireccion} ver_guardar={false}/>}
        <br/>
        {!info_personal?.id && !direccion.id &&
        <button className='btn btn-outline-success d-flex justify-content-center'
                onClick={onGuardar}>
            <FaChevronRight className='mt-1 mx-2'/>
            {i18next.t('general:continuar')}
        </button>}
        <br/>
        {ver_errores && errores.length > 0 && <ListadoErrores errores={errores}/>}
    </div>);
}

const InfoPersonal = ({bloquear, info_personal, setInfoPersonal}) => {
    return (<div>
        <div className='d-flex'>
            <label className='col-4 flex-shrink-0 me-2'>{i18next.t('usuario:email')}:</label>
            {(bloquear || info_personal?.id) ? <b>{info_personal.email}</b> :
                <input className='form-control' value={info_personal.email || ''}
                       onChange={(e) => setInfoPersonal({...info_personal, email: e.target.value.trim()})}/>}
        </div>
        <div className='d-flex'>
            <label className='col-4 flex-shrink-0 me-2'>{i18next.t('usuario:nombre')}: </label>
            {(bloquear || info_personal?.id) ? <b>{info_personal.nombre}</b> :
                <input className='form-control' value={info_personal.nombre || ''}
                       onChange={(e) => setInfoPersonal({...info_personal, nombre: e.target.value})}/>}
        </div>
        <div className='d-flex'>
            <label className='col-4 flex-shrink-0 me-2'>{i18next.t('usuario:apellidos')}: </label>
            {(bloquear || info_personal?.id) ? <b>{info_personal.apellidos}</b> :
                <input className='form-control' value={info_personal.apellidos || ''}
                       onChange={(e) => setInfoPersonal({...info_personal, apellidos: e.target.value})}/>}
        </div>
        <div className='d-flex'>
            <label className='col-4 flex-shrink-0 me-2'>{i18next.t('usuario:fechaNacimiento')}: </label>
            {(bloquear || info_personal?.id) ? <b>{moment(info_personal.fecha_nacimiento).format('DD/MM/YYYY')}</b> :
                <DatePicker
                    value={info_personal.fecha_nacimiento ? moment(info_personal.fecha_nacimiento).toDate() : null}
                    actualiza={e => setInfoPersonal({
                        ...info_personal,
                        fecha_nacimiento: moment(e).format('YYYY-MM-DD')
                    })}
                    maxDate={moment().subtract(ANYOS_MAYOR_EDAD, 'year').toDate()}/>}
        </div>
        <div className='d-flex'>
            <label className='col-4 mt-2 flex-shrink-0 me-2'>{i18next.t('usuario:telefono')}: </label>
            {(bloquear || info_personal?.id) ? <b>{info_personal.telefono}</b> :
                <input className='form-control' value={info_personal.telefono || ''}
                       onChange={(e) => setInfoPersonal({...info_personal, telefono: e.target.value})}/>}
        </div>
    </div>);
}

const Direccion = ({dir, setDireccion, selected}) => {
    return (
        <div className={`d-flex flex-column border p-2 my-2 cursor  
        ${selected?.id === dir.id && 'btn-primary text-white'}`}
             onClick={() => setDireccion(dir)}>
            <div className='flex-shrink-0'>{`${dir.calle} ${dir.numero_exterior} ${dir.numero_interior || ''}`}</div>
            <div>{`${dir.colonia}`}</div>
            <div className='d-flex justify-content-between'>
                <div>CP: {dir?.cp?.codigo}</div>
            </div>
        </div>
    )
}

export default ChDireccionPersonal;
