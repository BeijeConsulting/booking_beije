/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi } from '../../genericServices'

const authGetApi = async () => {
    return await getApi(`index`);
}

const signInPostApi = async (obj) => {
    return await postApi(`signin`, obj);
}
/* AUTH:isLogged */
const updateAuthTokenPostApi = async (obj) => {
    return await postApi(`/updateAuthToken`, obj);
}

export {
    authGetApi, signInPostApi, updateAuthTokenPostApi
}

