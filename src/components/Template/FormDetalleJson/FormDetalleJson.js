import React, {useEffect, useState} from 'react';
import EsNuevoEdit from "../EsNuevoEdit";
import {noop} from "../../../services/generalService";
import i18next from "i18next";
import TipoInput from "./TipoInput";
import TipoCheck from "./TipoCheck";
import TipoSelect from "./TipoSelect";
import TipoDatepicker from "./TipoDatepicker";
import {FaSave} from "react-icons/fa";
import {can} from "../../../services/seguridad.service";
import ListadoErrores from "../ListadoErrores";
import TipoSelectEnDuro from "./TipoSelectEnDuro";

const FormDetalleJson = ({
                             container_class = '',
                             cats = {},
                             metadata = {},
                             onGuardar = noop,
                             seleccionado = {},
                             setSeleccionado = noop,
                             ver_card_header = true,
                         }) => {

    const [errores, setErrores] = useState([]);
    const [ver_errores, setVerErrores] = useState(false);

    useEffect(() => {
        metadata?.schema.validate(seleccionado, {abortEarly: false})
            .then(() => setErrores([]))
            .catch(err => setErrores(err.errors));
    }, [seleccionado]);

    const handleGuardar = () => {
        if (errores.length === 0)
            onGuardar()
        else
            setVerErrores(true);
    }

    const puedeGuardar = () => {
        let puede = true;
        puede = puede && (metadata.permiso_guardar === null || can(metadata.permiso_guardar));
        puede = puede && (ver_errores === false || errores.length === 0);
        return puede;
    }

    return (
        <div className={`card border-tabla ${container_class}`}>
            {ver_card_header && <div className="card-header d-flex justify-content-between py-0">
                <h5 className="text-center text-titulo-tabla pt-2">
                    <i className="py-2 px-2">{i18next.t('catalogos:detalleRegistro')}</i>
                </h5>
                <div className="d-flex justify-content-center text-titulo-tabla mt-2">
                    <EsNuevoEdit es_nuevo={seleccionado?.id == null}/>
                </div>
            </div>}
            <div className="m-2 d-flex flex-column">
                {(metadata?.campos || []).filter(c => c.form_ver).map((campo, idx) => <div key={idx}>
                    {(campo?.form_tipo === 'text' || campo?.form_tipo === 'number' || campo?.form_tipo === 'textarea') &&
                    <TipoInput campo={campo} seleccionado={seleccionado} setSeleccionado={setSeleccionado}/>}
                    {campo?.form_tipo === 'check' &&
                    <TipoCheck campo={campo} seleccionado={seleccionado} setSeleccionado={setSeleccionado}/>}
                    {campo?.form_tipo === 'select_en_duro' &&
                    <TipoSelectEnDuro campo={campo} seleccionado={seleccionado} setSeleccionado={setSeleccionado}/>}
                    {campo?.form_tipo === 'select' &&
                    <TipoSelect cats={cats} campo={campo} seleccionado={seleccionado}
                                setSeleccionado={setSeleccionado}/>}
                    {campo?.form_tipo === 'datepicker' &&
                    <TipoDatepicker campo={campo} seleccionado={seleccionado} setSeleccionado={setSeleccionado}/>}
                    {/*        {campo?.form_tipo=== 'markdown'&&*/}
                    {/*        <div className="mt-2">*/}
                    {/*            <label className="mx-2">{i18next.t(campo?.label)}:</label>*/}
                    {/*            <button className="btn btn-outline-blue p-0" onClick={()=>launchModalEditor(idx)}><BsTextareaT/></button>*/}
                    {/*        </div>*/}
                    {/*        }*/}
                </div>)}
                {/*    <ModalEditor/>*/}
                <div className="mt-3">
                    {puedeGuardar() &&
                    <button className="btn-outline-success w-100"
                            onClick={handleGuardar}>
                        <FaSave/>{i18next.t("general:guardar")}
                    </button>}
                    {ver_errores && errores.length > 0 && <ListadoErrores errores={errores}/>}
                </div>
            </div>
        </div>
    );
};

export default FormDetalleJson;
