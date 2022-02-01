import React from 'react';
import {FaCode} from "react-icons/fa";
import moment from "moment";
import {AiOutlineCopyright} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className='text-white d-flex flex-column py-2 temp__footer'>
            <div className='d-flex justify-content-center'>Desarrollado por: Francisco González Bobadilla</div>
            <div className='d-flex justify-content-center'>
                <span><AiOutlineCopyright /> {moment().toDate().getFullYear()}. Todos los derechos reservados.</span>
            </div>
            <div className='d-flex justify-content-end cursor'><FaCode/></div>
        </footer>
    );
};

export default Footer;
