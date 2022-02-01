import i18next from 'i18next';
//|------Español------|//
import admin_es from './es/admin.json';
import articulos_es from './es/articulos.json';
import auth_es from './es/auth.json';
import blog_es from './es/blog.json';
import catalogos_es from './es/catalogos.json';
import error_es from './es/error.json';
import general_es from './es/general.json';
import navbar_es from './es/navbar.json';
import titulos_es from './es/titulos.json';
import usuario_es from './es/usuario.json';
import propiedad_es from './es/propiedad.json';

//|------Ingles------|//

/*
Ejemplo para cambio de idioma con botón
<button onClick={()=>{
                setLS("locale", 'en');
                iniciaLang();
            }}>assad</button>
 */

const getLocale = () => {
    let idioma = navigator.language || navigator.userLanguage;
    if(typeof localStorage.getItem("locale") === "undefined" || localStorage.getItem("locale") === null)
        localStorage.setItem("locale", idioma.substring(0, 2))
    return localStorage.getItem("locale");
}
export const iniciaLang = () => {
    i18next.init({
        interpolation: {escapeValue: false},
        lng: getLocale(),
        resources: {
            es: {
                admin: admin_es,
                articulo: articulos_es,
                auth: auth_es,
                blog: blog_es,
                catalogos: catalogos_es,
                error: error_es,
                general: general_es,
                navbar: navbar_es,
                titulo: titulos_es,
                usuario: usuario_es,
                propiedad:propiedad_es
            }
        }

    });
};

export default i18next; 
