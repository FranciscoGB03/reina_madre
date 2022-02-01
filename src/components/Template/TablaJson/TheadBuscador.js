import React from 'react';
import _ from "lodash";
import {deepValue} from "../../../services/propertiesService";
import i18next from "i18next";

const TheadBuscador = ({metadata, filtro, setFiltro}) => {
    const handleChange = (campo, value) => {
        const nuevo_obj = _.update(filtro, campo.buscador_key, () => value);
        setFiltro({...nuevo_obj});
    }
    return (
        <thead className=''>
        <tr>
            {(metadata?.campos || []).map((campo, idx) =>
                (campo?.ver_en_tabla && campo?.show_buscador) &&
                <th className="py-1" key={(campo?.buscador_key || idx)}>
                    {(campo?.display || '') === '' ?
                        <campo.buscador_component filtro={filtro} setFiltro={setFiltro}/> :
                        <input className='form-control form-control-sm'
                               value={deepValue(campo.buscador_key, filtro) || ""}
                               placeholder={i18next.t('catalogos:buscar')}
                               onChange={(e) =>
                                   handleChange(campo, e.target.value)
                               }/>}
                </th>)}
            <th></th>
        </tr>
        </thead>);
};

export default TheadBuscador;
