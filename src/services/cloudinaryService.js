export const getClUrl = (public_id, query = '') => {
    let url = `${process.env.REACT_APP_URL_CLOUDINARY}/`;
    if (query !== '')
        url += `/${query}`;
    url += `/${public_id}`;
    return url;
}
