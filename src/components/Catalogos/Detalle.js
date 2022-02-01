import React, {useEffect, useState} from 'react';
import {GiSave} from 'react-icons/gi';
import {RiCheckboxLine, RiCheckboxBlankLine} from 'react-icons/ri';
import i18next from "i18next";
import TextAreaAutosize from "react-textarea-autosize";
import EsNuevoEdit from "../Template/EsNuevoEdit";
import {useStore} from "../../index";
import {setSeleccionado} from "../../store/generalStore";
import {can} from "../../services/seguridad.service";
import {guardarCatalogo, validaCatalogoSeleccionado} from "../../store/catalogosStore";
import ListadoErrores from "../Template/ListadoErrores";
import Select from "../Template/Select";
import moment from "moment";
import DatePicker from "../Template/DatePicker";
import {BsTextareaT} from 'react-icons/bs';
import {Modal} from "bootstrap";
import ModalEditor from "./ModalEditor";

const Detalle = () => {
    //|------Hooks/Constantes------|//
    const seleccionado = useStore.getState().seleccionado;
    const catalogo = useStore.getState().catalogo;
    const errores = useStore.getState().errores;
    const [ver_errores, setVerErrores] = useState(false);

    useEffect(() => {
        validaCatalogoSeleccionado();
    }, [seleccionado]);

    const handleGuardar = () => {
        if (errores.length === 0)
            guardarCatalogo(catalogo.key);
        else
            setVerErrores(true);
    }

    const puedeGuardar = () => {
        let puede = true;
        puede = puede && (catalogo.permiso_guardar === null || can(catalogo.permiso_guardar));
        puede = puede && (ver_errores === false || errores.length === 0);
        return puede;
    }
    //|-------Funciones-------|//
    const launchModalEditor = (idx) => {
        let editor=new Modal(document.getElementById('modalEditor'));
        useStore.setState({campo:catalogo.campos[idx]})
        useStore.setState({modalEditor: editor});
        useStore.getState().modalEditor.show();
    };
    return (
        <div className="card border-tabla z-depth-2">
            <div className="card-header d-flex justify-content-between py-0">
                <h5 className="text-center text-titulo-tabla pt-2">
                    <i className="py-2 px-2">{i18next.t('catalogos:detalleRegistro')}</i>
                </h5>
                <div className="d-flex text-titulo-tabla justify-content-center mt-2">
                    <EsNuevoEdit es_nuevo={seleccionado?.id == null}/>
                </div>
            </div>
            <div className="m-2 d-flex flex-column">
                {(catalogo?.campos || []).filter(c => c.form_ver).map((campo, idx) => <div key={idx}>
                    {(campo?.form_tipo === 'text' || campo?.form_tipo === 'number' || campo?.form_tipo === 'textarea') &&
                    <TipoInput campo={campo}/>}
                    {campo?.form_tipo === 'check' &&
                    <TipoCheck campo={campo}/>}
                    {campo?.form_tipo === 'select' &&
                    <TipoSelect campo={campo}/>}
                    {campo?.form_tipo === 'datepicker' &&
                    <TipoDatepicker campo={campo}/>}
                    {campo?.form_tipo=== 'markdown'&&
                        <div className="mt-2">
                            <label className="mx-2">{i18next.t(campo?.label)}:</label>
                            <button className="btn btn-outline-blue p-0" onClick={()=>launchModalEditor(idx)}><BsTextareaT/></button>
                        </div>
                    }
                </div>)}
                <ModalEditor/>
                <div className="mt-3">
                    {puedeGuardar() &&
                    <button className="btn-outline-success w-100"
                            onClick={handleGuardar}>
                        <GiSave/>{i18next.t("general:guardar")}
                    </button>}
                    {ver_errores && errores.length > 0 && <ListadoErrores errores={errores}/>}
                </div>
            </div>
        </div>
    );
};

const TipoInput = ({campo}) => {
    const seleccionado = useStore.getState().seleccionado;
    const handleChange = value => {
        let nuevo = {};
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (<div className="mt-1 d-flex">
        <label className="mx-2">{i18next.t(campo?.label)}:</label>
        <div>
            {campo.form_tipo === 'textarea' ?
                <TextAreaAutosize className='form-control form-control-sm'
                                  placeholder={i18next.t(campo?.label)}
                                  value={seleccionado[campo.key] || ''}
                                  onChange={e => handleChange(e.target.value)}/> :
                <input className='form-control form-control-sm'
                       placeholder={i18next.t(campo?.label)}
                       maxLength={campo.max_length}
                       type={campo.form_tipo}
                       value={seleccionado[campo.key] || ''}
                       onChange={e => handleChange(e.target.value)}/>}
        </div>
    </div>);
}

const TipoCheck = ({campo}) => {
    const seleccionado = useStore.getState().seleccionado;
    const handleClick = value => {
        let nuevo = {};
        nuevo[campo.key] = nuevo[campo.key] !== null ? !seleccionado[campo.key] : true;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div onClick={handleClick}>
                {seleccionado[campo.key] ?
                    <RiCheckboxLine color="green" size={30}/> : <RiCheckboxBlankLine size={30}/>}
            </div>
        </div>
    )
};
const TipoSelect = ({campo}) => {
    const seleccionado = useStore.getState().seleccionado;
    const cats = useStore.getState().cats;
    const handleChange = value => {
        let nuevo = {};
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div>
                <Select options={cats[campo.cat_key]}
                        className='form-select-sm'
                        selected={seleccionado[campo.key]}
                        onSelect={e => handleChange(e)}/>
            </div>
        </div>
    )
};
const TipoDatepicker = ({campo}) => {
    const seleccionado = useStore.getState().seleccionado;
    const handleChange = value => {
        let nuevo = {};
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div>
                <DatePicker value={seleccionado[campo?.key] ? moment(seleccionado[campo?.key]).toDate() : null}
                            actualiza={e => handleChange(moment(e).format('YYYY-MM-DD'))}
                />
            </div>
        </div>
    )
};

export default Detalle;
