export const setLS = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export  const getLS = (key) => JSON.parse(window.localStorage.getItem(key));

export const limpiarLs = (key) =>window.localStorage.removeItem(key);
