/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const fotoAnnunciGetApi = async () => {
    return await getApi("foto_annunci");
}

const fotoAnnunciDetailGetApi = async (id) => {
    return await getApi(`foto_annunci/${id}`);
}

/* AUTH:HOST */
const fotoAnnunciInsertPostApi = async (obj, header) => {
    return await postApi(`foto_annuci`, obj, header);
}

/* AUTH:HOST */
const fotoAnnunciModifyPutApi = async (id, obj, header) => {
    return await putApi(`foto_annuci/${id}`, obj, header);
}

/* AUTH:HOST */
const fotoAnnunciDeleteApi = async (id, obj, header) => {
    return await deleteApi(`foto_annuci/${id}`, obj, header);
}

export {
    fotoAnnunciGetApi, fotoAnnunciDetailGetApi, fotoAnnunciInsertPostApi, fotoAnnunciModifyPutApi, fotoAnnunciDeleteApi
}
