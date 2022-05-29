/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi, deleteApi } from '../../../genericServices';

/* AUTH:USER */
const getFavourites = async (header) => {
   return await getApi(`preferiti`, header);
}

/* AUTH:USER */
const addFavourite = async (id, header) => {
   return await postApi(`add_preferiti/${id}`, header);
}

const deleteFavourite = async (id, header) => {
   return await deleteApi(`preferiti/${id}`, header);
}


export {
   getFavourites, addFavourite, deleteFavourite
}