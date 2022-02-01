import React from 'react';
import i18next from "i18next";
import {FaSave} from "react-icons/fa";
import {guardarContratoPropiedad} from "../../api/adjuntosApi";
import Adjuntos from "../Template/Adjuntos/Adjuntos";
import {cerrarAlert} from "../../services/swalService";

const ModalArchivoAdjunto = ({seleccionado}) => {
    const handleGuardar = (files) => {
        guardarContratoPropiedad(seleccionado?.id, files).then(()=> {
            cerrarAlert();

        })
    };
    return (
        <div className="modal fade" id="modalArchivoAdjunto" tabIndex="-1" aria-labelledby="archivoAdjunto"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="archivoAdjunto">{i18next.t('propiedad:agregarContrato')} {seleccionado?.nombre}</h5>
                        <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Adjuntos onGuardar={handleGuardar} multiple={false}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                id="guardar"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">{i18next.t('general:cancelar')}</button>
                        <button type="button"
                                className="btn btn-outline-success"
                                onClick={() => console.log(seleccionado)}>
                            <FaSave/><span className="ms-2">{i18next.t('general:guardar')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModalArchivoAdjunto;