import React, {useEffect} from 'react';
import Navbar from './Navbar/Navbar';
import './template.css';
import {useStore} from "../../index";
import Footer from "./Footer";
import {isLogged} from "../../services/authService";
import {useNavigate} from "react-router-dom";
import EtiquetasMeta from "./EtiquetasMeta";

const Template = (props) => {
    let navigate=useNavigate();
    useEffect(()=> {
        validaSesion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const {control} = useStore();
    const validaSesion=()=>{
        if(!isLogged())
            navigate('/login');
    }
    return (
        <div id={control}>
            <EtiquetasMeta titulo="Reina Madre" descripcion="EDIFICASA" />
            <div>
                <Navbar/>
                <div className="row mx-0 px-0"  style={{minHeight: '82vh'}}>
                      {props.children}
                </div>
                <Footer/>
            </div>
        </div>
    );
}
export default Template;
