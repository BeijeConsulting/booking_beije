/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, putApi, postApi } from '../../genericServices'


const showAllStruttureGetApi = async () => {
    return await getApi(`showAllStrutture`);
}

const showAllStruttureGetApiPagination = async (query) => {
    return await getApi(`showAllStrutture${query}`);
}

/* AUTH:HOST */
const insertStrutturaPostApi = async (obj, header) => {
    return await postApi(`insertStruttura`, obj, header);
}

const strutturaDetailIdGetApi = async (id, header) => {
    return await getApi(`struttura/${id}`, header);
}

/* AUTH:HOST */
const disableStrutturaPutApi = async (id, obj, header) => {
    return await putApi(`disableStruttura/${id}`, obj, header);
}

/* AUTH:HOST */
const updateStrutturaPutApi = async (id, obj, header) => {
    return await putApi(`updateStruttura/${id}`, obj, header);
}

export {
    showAllStruttureGetApiPagination,
    insertStrutturaPostApi,
    disableStrutturaPutApi,
    updateStrutturaPutApi,
    strutturaDetailIdGetApi,
    showAllStruttureGetApi
}
