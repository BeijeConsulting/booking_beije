/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const reviewsGetApi = async () => {
    return await getApi(`reviews`);
}

/* AUTH:ADMIN */
const serviceAddPostApi = async (obj, header) => {
    return await postApi(`add_service`, obj, header);
}

/* AUTH:ADMIN */
const serviceDeleteApi = async (id, header) => {
    return await deleteApi(`del_service/${id}`, header);
}

/* AUTH:ADMIN */
const serviceModifyIdPutApi = async (id, obj, header) => {
    return await putApi(`update_service/${id}`, obj, header);
}

export {
    reviewsGetApi, serviceAddPostApi, serviceDeleteApi, serviceModifyIdPutApi
}