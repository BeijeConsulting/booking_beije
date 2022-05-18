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
    return await postApi(`foto_annunci`, obj, header);
}

/* AUTH:HOST */
const fotoAnnunciModifyPutApi = async (id, obj, header) => {
    return await putApi(`foto_annunci/${id}`, obj, header);
}

/* AUTH:HOST */
const fotoAnnunciDeleteApi = async (id, header) => {
    return await deleteApi(`foto_annunci/${id}`, header);
}

export {
    fotoAnnunciGetApi, fotoAnnunciDetailGetApi, fotoAnnunciInsertPostApi, fotoAnnunciModifyPutApi, fotoAnnunciDeleteApi
}
