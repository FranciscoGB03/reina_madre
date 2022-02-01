import React, {useEffect} from 'react';
import {sesionIniciada} from "../../services/seguridad.service";
import {ocultableWarning} from "../../services/swalService";
import {useNavigate} from 'react-router-dom';
import i18next from "i18next";

const SinSesion = ({habilitado = true, goBack = true}) => {
    let Navigate = useNavigate();
    useEffect(() => {
        if (habilitado) {
            if (!sesionIniciada()) {
                ocultableWarning(i18next.t('general:sesionContinuar'), i18next.t('general:sinSesion')).then(() => {
                    if (goBack)
                        Navigate.goBack();
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div></div>
    );
};

export default SinSesion;
