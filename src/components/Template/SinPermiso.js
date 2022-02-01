import React from 'react';
import {FiShield} from "react-icons/fi";
import i18next from "i18next";

const SinPermiso = () => {
    return (
        <div className='w-100 d-flex justify-content-center h-100'>
            <div className='alert alert-danger d-flex flex-column'>
                <div className='text-center'>
                    <FiShield size={300}/>
                    <h1 className='text-center mt-3'>{i18next.t('general:sinPermiso')}</h1>
                </div>
            </div>
        </div>
    );
};

export default SinPermiso;
