/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const regoleGetApi = async () => {
    return await getApi(`regole`);
}

const regoleIdGetApi = async (id) => {
    return await getApi(`regole/${id}`);
}

/* AUTH:ADMIN */
const regolePostApi = async (obj, header) => {
    return await postApi(`regole`, obj, header);
}

/* AUTH:ADMIN */
const regolaModifyPutApi = async (id, obj, header) => {
    return await putApi(`regola/${id}}`, obj, header);
}

/* AUTH:ADMIN */
const regoleIdDeleteApi = async (id, header) => {
    return await postApi(`regole/${id}`, header);
}

export {
    regoleGetApi, regoleIdGetApi, regolePostApi, regolaModifyPutApi, regoleIdDeleteApi
}