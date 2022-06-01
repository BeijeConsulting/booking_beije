/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi, deleteApi } from '../../../genericServices';

/* AUTH:USER */
const getFavourites = async (itemsPerPage = 10, page = 1, header) => {
   return await getApi(`preferiti?itemsPerPage=${itemsPerPage}&page=${page}`, header);
}

/* AUTH:USER */
const addFavourite = async (id, header) => {
   return await postApi(`add_preferiti/${id}`, null, header);
}

const deleteFavourite = async (id, header) => {
   return await deleteApi(`preferiti/${id}`, header);
}


export {
   getFavourites, addFavourite, deleteFavourite
}