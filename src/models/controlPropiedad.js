export const ControlPropiedadModel={
    departamento:{id:''},
    empresa:{id:''},
    usuario:{id:''}
}
export const consultaModel = {
    "order": {
        "key": "id",
        "tipo": "asc"
    },
    "filtros": {},
    "relaciones": ['departamento','empresa','usuario'],
    "pagina": 1,
    "rows": 25,
    "control": 0
}