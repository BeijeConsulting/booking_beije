/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'


const reviewsGetApi = async () => {
    return await getApi(`reviews`);
}

const reviewsOnStrutturaIdGetApi = async (id) => {
    return await getApi(`/reviews-by-struttura/${id}`);
}

/* AUTH:USER */
const reviewIdGetApi = async (id, header) => {
    return await getApi(`review/${id}`, header);
}

/* AUTH:USER */
const reviewPostApi = async (obj, header) => {
    return await postApi(`review`, obj, header);
}

/* AUTH:USER */
const reviewIdModifyPutApi = async (id, obj, header) => {
    return await putApi(`review/${id}`, obj, header);
}

/* AUTH:USER */
const reviewDeleteApi = async (id, header) => {
    return await deleteApi(`review/${id}`, header);
}

export {
    reviewsGetApi, reviewsOnStrutturaIdGetApi, reviewIdGetApi, reviewPostApi, reviewIdModifyPutApi, reviewDeleteApi
}