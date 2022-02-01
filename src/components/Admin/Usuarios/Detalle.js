import React from 'react';
import FormDetalleJson from "../../Template/FormDetalleJson/FormDetalleJson";
import {registraUsuario} from "../../../api/usuariosApi";
import {cerrarAlert, staticOcultableSuccess} from "../../../services/swalService";
import i18next from "i18next";

const Detalle = ({metadata, onRefresh, seleccionado, setSeleccionado, cats}) => {

    const guardarUsuario = () => {
        registraUsuario(seleccionado).then(r => {
            cerrarAlert();
            if (r.password !== null)
                staticOcultableSuccess(i18next.t('usuario:sinPassword') + r.password, i18next.t('usuario:importante')).then(()=>{
                    setSeleccionado({});
                    onRefresh();
                });
            else{
                setSeleccionado({});
                onRefresh();
            }
        })
    }

    return (
        <div>
            <FormDetalleJson container_class='z-depth-2'
                             cats={cats}
                             metadata={metadata}
                             onGuardar={guardarUsuario}
                             seleccionado={seleccionado}
                             setSeleccionado={setSeleccionado}/>
        </div>
    );
};

export default Detalle;
