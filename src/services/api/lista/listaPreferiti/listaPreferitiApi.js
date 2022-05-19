/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi, deleteApi } from '../../genericServices'

/* AUTH:USER */
const preferitiUserGetApi = async (id, header) => {
    return await getApi(`preferiti/${id}`, header);
}

/* AUTH:USER */
const listaPreferitiGetApi = async (obj, header) => {
    return await postApi(`preferiti`, obj, header);
}

const preferitiDeleteApi = async (id, header) => {
    return await deleteApi(`preferiti/${id}`, header);
}


export {
    preferitiUserGetApi, listaPreferitiGetApi, preferitiDeleteApi
}