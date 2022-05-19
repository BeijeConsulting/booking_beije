/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const imagesGetApi = async () => {
    return await getApi(`images`);
}

const imageDetailGetApi = async (id) => {
    return await getApi(`image/${id}`);
}

/* AUTH:HOST */
const imageInsertPostApi = async (obj, header) => {
    return await postApi(`insert_image`, obj, header);
}

/* AUTH:HOST */
const imageModifyPutApi = async (id, obj, header) => {
    return await putApi(`update_image/${id}`, obj, header);
}

/* AUTH:ADMIN */
const imageDeleteApi = async (id, header) => {
    return await deleteApi(`delete_image/${id}`, header);
}

export { imagesGetApi, imageDetailGetApi, imageInsertPostApi, imageModifyPutApi, imageDeleteApi }