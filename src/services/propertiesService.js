export const deepValue = (path, object) => {
    if (typeof path === 'undefined' || path === null || typeof object === 'undefined' || object === null)
        return null;
    let valor = null;
    let propiedades = path.split(".");
    propiedades.forEach((prop, index) => {
        if (typeof object[prop] !== 'undefined' && object[prop] !== null) {
            object = object[prop];
            if (index === propiedades.length - 1)
                valor = object;
        }
    });
    return valor;
}
