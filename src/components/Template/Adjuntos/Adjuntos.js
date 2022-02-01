import React, {useEffect, useState} from 'react';
import FilesDropzone from "./FilesDropzone";
import {FaTrash, FaUpload} from "react-icons/fa";
import i18next from "i18next";

const Adjuntos = ({onGuardar, multiple}) => {
    const [archivos, setArchivos] = useState([]);

    const handleAgregarFiles = (nuevos) => {
        if (multiple)
            setArchivos([...archivos, ...nuevos])
        else
            setArchivos([...nuevos])
    };

    const eliminarFile = idx => setArchivos(archivos.filter((_, i) => i !== idx));

    return (
        <div className='d-flex flex-column container'>
            <FilesDropzone multiple={multiple} onChange={handleAgregarFiles}/>
            <ul className='mt-3'>
                {(archivos).map((a, idx) =>
                    <li key={idx} className='d-flex justify-content-between px-3'>
                        <div>{a.name}</div>
                        <FaTrash className='cursor' onClick={() => eliminarFile(idx)}/>
                    </li>
                )}
            </ul>
            <button disabled={archivos.length === 0}
                    className='btn btn-outline-success d-flex justify-content-center flex-nowrap'
                    onClick={() => onGuardar(archivos)}>
                <FaUpload className='mt-1 mx-2'/>
                <div>{i18next.t('general:subir')}</div>
            </button>
        </div>
    );
};

export default Adjuntos;
