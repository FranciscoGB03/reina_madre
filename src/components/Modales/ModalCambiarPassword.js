import React, {useEffect, useState} from 'react';
import {useStore} from "../../index";
import i18next from "i18next";
import {FaEye, FaSave} from "react-icons/fa";
import {cambiarPassword} from "../../api/usuariosApi";

const ModalCambiarPassword = () => {
    const registro = useStore().registroPassword;
    const [password, setPassword] = useState('');
    const [confirmarPw, setConfirmarPw] = useState('');
    const [mostrarPasswd, setMostrarPasswd] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [errores, setErrores] = useState('');
    useEffect(() => {
        setPassword('');
        setConfirmarPw('');
        setMostrarPasswd(false);
        setMostrarConfirmacion(false);
    }, [registro])
    const guardar = () => {
        if (password === confirmarPw) {
            if (password.length < 8)
                setErrores(i18next.t('usuario:longitudPasswd'));
            else {
                if (password_validate.test(password)){
                    setErrores('');
                    cambiarPassword(registro.id,password).then(()=>{
                        useStore.getState().modalCambiarPassword.hide()
                    })
                }
                else
                    setErrores(i18next.t('usuario:formatoPasswd'));
            }
        } else {
            setErrores(i18next.t('usuario:passwdNoIguales'));
        }
    }
    const password_validate = new RegExp('^(?=(?:.*\\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡#!\\-_]){1})\\S{8,}$');
    return (
        <div className="modal fade" id="modalCambiarPassword" tabIndex="-1" aria-labelledby="cambiarPassword"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cambiarPassword">{i18next.t('usuario:cambiarPassword')}</h5>
                        <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex">
                            <label className="me-2 text-nowrap">{i18next.t('usuario:nuevoPassword')}:</label>
                            <div className="d-flex input-group">
                                <input className="form-control form-control-sm"
                                       type={mostrarPasswd ? "text" : "password"}
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                                <div className="border p-1 bg-light"
                                     onClick={() => setMostrarPasswd(!mostrarPasswd)}>
                                    <FaEye/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <label className="me-2 text-nowrap">{i18next.t('usuario:confirmarPassword')}:</label>
                            <div className="d-flex input-group">
                                <input className="form-control form-control-sm"
                                       type={mostrarConfirmacion ? "text" : 'password'}
                                       value={confirmarPw}
                                       onChange={e => setConfirmarPw(e.target.value)}/>
                                <div className="border p-1 bg-light"
                                     onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}>
                                    <FaEye/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="badge bg-warning text-dark text-wrap">
                                {errores !== '' ? <span>{errores}</span> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                id="guardar"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">{i18next.t('general:cancelar')}</button>
                        <button type="button"
                                className="btn btn-outline-success"
                                onClick={() => guardar()}>
                            <FaSave/><span className="ms-2">{i18next.t('general:guardar')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModalCambiarPassword;