import IconosSort from "../Tablas/IconosSort";
import i18next from "i18next";
import React from "react";

const TheadTitulos = ({metadata, sort, setSort}) => {
    const handleSort = key => {
        if (key === sort.key)
            setSort({...sort, order: sort.order === 'asc' ? 'desc' : 'asc'});
        else
            setSort({key, order: 'asc'});
    };
    return (
        <thead className=''>
        <tr>
            {(metadata?.campos || []).map(campo =>
                campo?.ver_en_tabla &&
                <th className='text-center cursor' key={campo.sort_key}
                    onClick={() => handleSort(campo.sort_key)}>
                    <IconosSort key_sort={campo.sort_key} key_actual={sort.key} order={sort.order}/>
                    {i18next.t(campo.label)}
                </th>)}
            <th></th>
        </tr>
        </thead>
    );
}

export default TheadTitulos;
