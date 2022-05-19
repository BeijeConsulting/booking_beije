/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi } from '../../genericServices'

const listaRegoleGetApi = async () => {
    return await getApi(`lista_regole`);
}

const listaRegoleDetailGetApi = async (id) => {
    return await getApi(`lista_regole/${id}`);
}

const listaRegolePostApi = async (obj) => {
    return await postApi(`lista_regole`, obj);
}

const listaRegoleModifyPutApi = async (id, obj) => {
    return await postApi(`lista_regole/${id}`, obj);
}

export {
    listaRegoleGetApi, listaRegoleDetailGetApi, listaRegolePostApi, listaRegoleModifyPutApi
}
