import React, {useState} from 'react'
import Campo from '../../Template/Campo';
import i18next from 'i18next';
import {Link} from 'react-router-dom';
import {attempt} from '../../../services/authService';
import logo from '../../../assets/img/logo_small.png';
import {useStore} from "../../../index";

const ModalLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //|------APi------|//
    const attempLogin = () => {
        if (username && password) {
            attempt(username, password);
        }
    }
    //|------data------|//
    const handleKeyUp = (e) => {
        if (e.key === 'Enter')
            attempLogin();
    }
    return (
        <div className="modal fade" id="modalLogin" tabIndex="-1" role="dialog" aria-labelledby="modalLoginTitle"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-center w-100 mt-5">
                            <img alt='Logo'
                                 src={logo}/>
                        </div>
                        <div className="">
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e => e.preventDefault()}>
                            <Campo required={true}
                                   containerClass="w-100"
                                   type="email"
                                   autoFocus={true}
                                   onKeyUp={handleKeyUp}
                                   placeholder={i18next.t("general:correoElectronico")}
                                   onChange={e => setUsername(e.target.value)}/>
                            <Campo containerClass="w-100"
                                   type="password"
                                   onKeyUp={handleKeyUp}
                                   placeholder={i18next.t("general:password")}
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="text-small mx-auto">
                        <div className="">
                            <p>{i18next.t("navbar:registrar")}
                                <Link to="/registrarse"
                                      onClick={() => useStore.getState().modalLogin.hide()}
                                >{i18next.t("navbar:aqui")}
                                </Link>
                            </p>
                            <p>{i18next.t("navbar:olvidar")}
                                <Link to="/usuario/recuperarPassword"
                                      onClick={() => useStore.getState().modalLogin.hide()}
                                >{i18next.t("navbar:aqui")}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer d-flex flex-nowrap">
                        <button type="submit"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">{i18next.t('general:cancelar')}
                        </button>
                        <button type="button"
                                disabled={username === '' || password === ''}
                                className={`btn btn-info text-nowrap`}
                                onClick={() => attempLogin()}>
                            {i18next.t('general:iniciarSesion')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalLogin;
