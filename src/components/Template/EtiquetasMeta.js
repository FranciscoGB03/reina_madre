import {Helmet} from 'react-helmet-async';
import React from "react";

const EtiquetasMeta = ({titulo, descripcion}) => {
    const jsonld_data={
        "@context": "http://www.schema.org",
        "@type": "Store",
        "name": "Nutrigeli",
        "url": "https://www.nutrigeli.com",
        "description": "Empresa familiar enfocada en elaborar y comercializar productos a base de colageno.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "NUTRIGELI, Nicolás Navarro 16, 52210 Zaragoza de Guadalupe, Méx.",
            "addressLocality": "Calimaya",
            "addressRegion": "Estado De México",
            "postalCode": "52210",
            "addressCountry": "México"
        },
        "hasMap": "https://www.google.com/maps/place/NUTRIGELI/data=!3m1!4b1!4m2!3m1!1s0x85cd8e6ccefc1ae3:0x359a3f18c658c60e",
        "openingHours": "Mo, Tu, We, Th, Fr 09:00-18:00 Sa 10:00-13:00",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "722 892 8654",
            "contactType": "General"
        }
    };
    return (
        <Helmet className="p-0 m-0">
            <title>{titulo}</title>
            <meta name="description" content={descripcion}/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={`${process.env.REACT_APP_APP_NAME}|${titulo}`}/>
            <meta property="og:description" content={descripcion}/>
            <meta property="og:site_name" content={`${process.env.REACT_APP_APP_NAME}`}/>
            <meta name="robots"
                  content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />
            <script type="application/ld+json">
                {JSON.stringify(jsonld_data)}
            </script>
        </Helmet>
    );
}
export default EtiquetasMeta;
