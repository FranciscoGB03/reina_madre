export const nuevoUsuarioModel = {
    "email": "",
    "password": "",
    "password2": "",
    "terminos_aceptados": false,
    "promociones_aceptadas": true,
    "nombre": "",
    "apellidos": "",
    "fecha_nacimiento": null,
    "quiero_ofertar": false,
    "quiero_adquirir": true
}

export const consultaModel = {
    "order": {
        "key": "id",
        "tipo": "asc"
    },
    "filtros": {},
    "relaciones": ['rol'],
    "pagina": 1,
    "rows": 25,
    "control": 0
}

export const metadataModel = {
    "total_registros": 0,
    "rows_por_pagina": 0,
    "paginas": 0,
    "pagina": 0
}

export const editarUsuarioModel = {
    "id": 0,
    "email": "",
    "info_personal": {
        "nombre": "",
        "apellidos": "",
        "fecha_nacimiento": null
    }
}
