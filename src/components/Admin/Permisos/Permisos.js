import React from 'react';
import {useEffect} from 'react';
import Template from "../../Template/Template";
import Titulo from "../../Template/Titulo";
import Roles from './Roles';
import PermisosAsignados from './PermisosAsignados';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from "../../../services/authService";
import {FcRules} from "react-icons/fc";
import i18next from "i18next";
import {cargarAsignarPermisos} from "../../../store/permisosAdminStore";
import {useStore} from "../../../index";

const PermisosAdmin = () => {
    //|------Hooks------|//
    const seleccionado = useStore().seleccionado;
    //|-----------useEffects----------|//
    useEffect(() => cargarAsignarPermisos(), []);
    //|------./Datos iniciales------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div>
                        <Titulo titulo={i18next.t('admin:asignacionPermisosRol')} icono={FcRules}/>
                        <div className=" d-flex justify-content-center flex-wrap">
                            <div className="mb-2">
                                <Roles/>
                            </div>
                            {(seleccionado?.id != null) &&
                            <div className="d-flex flex-wrap">
                                <div>
                                    <PermisosAsignados/>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                : <SinSesion/>
            }
        </Template>
    );
}

export default PermisosAdmin;
