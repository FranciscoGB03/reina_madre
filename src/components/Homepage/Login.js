import React, {useEffect, useState} from 'react';
import {isBrowser, isMobile} from 'react-device-detect';
import i18next from "i18next";
import {FaLock} from "react-icons/fa";
import {attempt, isLogged} from "../../services/authService";
import {ocultableInfo} from "../../services/swalService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        validaSesion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const validaSesion = () => {
        if (isLogged())
            navigate('/home');
    }
    const handleAttemp = () => {
        if (email !== '' && password !== "")
            attempt(email, password).then(r => {
                navigate('/home');
            })
        else
            ocultableInfo(i18next.t('navbar:emailPasswordRequeridos'), i18next.t('general:oops'))
    };

    return (
        <div className='w-100 bg-primary-color' style={{minHeight: '100vh'}}>
            <div className='d-flex flex-column justify-content-between' style={{minHeight: '100vh'}}>
                <div></div>
                <div className='d-flex  justify-content-center'>
                    <div className={`d-flex flex-wrap justify-content-center ${isMobile ? 'flex-column' : ''}`}>
                        <div className={`d-flex flex-column justify-content-center ${isMobile ? 'w-100' : 'w-25'}`}>
                            <div className='d-flex flex-column justify-content-center text-white pr-2 m-2'>
                                <img className='img-fluid rounded z-depth-3' src="" alt="Reina Madre LOGO"/>
                            </div>
                        </div>
                        <div className={`${isBrowser ? 'home__vertical_separador' : ''} rounded my-5 mx-4`}></div>
                        <div className='rounded p-4 m-2 home__login_container d-flex flex-column z-depth-2'>
                            <h3 className='text-center mb-4'>{i18next.t('navbar:inicioSesion')}</h3>
                            <label className='text-center fw-bold'>{i18next.t('navbar:usuario')}</label>
                            <input className='form-control text-center' autoFocus
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}/>
                            <label className='text-center fw-bold mt-1'>{i18next.t('navbar:password')}</label>
                            <input className='form-control text-center'
                                   value={password}
                                   type='password'
                                   onKeyUp={e => {
                                       if (e.code === 'Enter')
                                           handleAttemp();
                                   }}
                                   onChange={e => setPassword(e.target.value)}/>
                            <button className='btn btn-outline-success d-flex flex-nowrap justify-content-center mt-3'
                                    onClick={handleAttemp}>
                                <FaLock className='mx-2 mt-1'/><span>{i18next.t('navbar:iniciarSesion')}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>

                </div>
            </div>
        </div>
    );
};

export default Login;
