/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const searchTipoStrutturabyStringGetApi = async (str) => {
    return await getApi(`searchTipoStruttura/search/${str}`);
}

const showAllTipoStrutturaGetApi = async () => {
    return await getApi(`showAllTipoStruttura`);
}

/* AUTH:ADMIN */
const tipoStrutturaPostApi = async (obj, header) => {
    return await postApi(`insertTipoStruttura`, obj, header);
}

/* AUTH:USER */
const tipoStrutturaModifyPutApi = async (id, obj, header) => {
    return await putApi(`updateTipoStruttura/${id}`, obj, header);
}

/* AUTH:ADMIN */
const tipoStrutturaDeleteApi = async (id, header) => {
    return await deleteApi(`deleteTipoStruttura/${id}`, header);
}

export {
    searchTipoStrutturabyStringGetApi, showAllTipoStrutturaGetApi, tipoStrutturaPostApi, tipoStrutturaModifyPutApi, tipoStrutturaDeleteApi
}