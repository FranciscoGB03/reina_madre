import React from 'react';
import {useStore} from "../../index";
import {setSeleccionado} from "../../store/generalStore";
import MarkDownEditor from "./MarkDownEditor";
import i18next from "i18next";

const ModalEditor = () => {
    const seleccionado = useStore.getState().seleccionado;
    const campo = useStore.getState().campo;
    const handleChange = ({text}) => {
        let nuevo = {};
        nuevo[campo.key] = text;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="modal fade" id="modalEditor" tabIndex="-1" role="dialog" aria-labelledby="modalEditorTitle"
             aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className=""><strong>{i18next.t(campo?.label)}</strong></div>
                        <div>
                            <button onClick={() => useStore.getState().modalEditor.hide()}
                            className="btn btn-outline-success">
                                {i18next.t('general:aceptar')}
                            </button>
                        </div>
                    </div>
                    <div className="mt-1">
                        <MarkDownEditor value={seleccionado[campo?.key] || ''} onChange={text => handleChange(text)}/>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default ModalEditor;