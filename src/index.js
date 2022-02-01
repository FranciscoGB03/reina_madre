import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//|-----LibreriasImport-------|//
import {HelmetProvider} from 'react-helmet-async';
import {iniciaLang} from './lang/i18n';
import {myStore} from "./store/store";

//|------Bootstrap------|//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

//|------CSS------|//
import './styles/animate.css'
import './styles/mdb.css';
import './styles/base.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/modules.css';
import './styles/imagehover.css';
import 'react-tippy/dist/tippy.css';
import "animate.css"
import 'react-image-lightbox/style.css';
import "react-datepicker/dist/react-datepicker.css";

//|------InitDeAplicacion------|//
export const useStore = myStore;
useStore.getState().cargaPermisos();
//useStore.getState().cargaConfiguracion();
//useStore.getState().cargaUsuario();
iniciaLang();

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <App/>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
