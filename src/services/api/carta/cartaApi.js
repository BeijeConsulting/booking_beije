/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

/* AUTH:USER */
const cardsGetApi = async (header) => {
    return await getApi(`cards`, header);
}

/* AUTH:USER */
const cardInsertPostApi = async (obj, header) => {
    return await postApi(`card`, obj, header);
}
/* AUTH:USER */
const cardModifyPutApi = async (obj, header) => {
    return await putApi(`card`, obj, header);
}

/* AUTH:USER */
const cardDeleteApi = async (id, header) => {
    return await deleteApi(`card/${id}`, header);
}


export {
    cardInsertPostApi, cardModifyPutApi, cardDeleteApi, cardsGetApi
}

