/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const annunciGetApi = async () => {
    return await getApi("annunci");
}

const annunciAccettazioneGetApi = async () => {
    return await getApi("annunci/accettazione");
}

const annuncioDetailGetApi = async (id) => {
    return await getApi(`annuncio/${id}`);
}

const annuncioOnStrutturaGetApi = async (id, page = 1, itemsPerPage = 3) => {
    return await getApi(`annuncio/struttura/${id}?page=${page}&itemsPerPage=${itemsPerPage}`);
}

/* AUTH:HOST */
const pendingAnnunciOnStruttura = async (id, page = 1, itemsPerPage = 3, header) => {
    return await getApi(`annuncio/struttura/pending/${id}?page=${page}&itemsPerPage=${itemsPerPage}`, header)
}

/* AUTH:HOST */
const annuncioModifyPutApi = async (id, obj, header) => {
    return await putApi(`annuncio / ${id}`, obj, header);
}

/* AUTH:HOST */
const annuncioInsertMutiplePostApi = async (quantity, obj, header) => {
    return await postApi(`annuncio / ${quantity}`, obj, header);
}
/* AUTH:ADMIN */
const annuncioapprovePutAPi = async (id, obj, header) => {
    return await putApi(`annuncio / ${id}`, obj, header);
}
/* AUTH:ADMIN */
const annuncioDeclinePutApi = async (id, obj, header) => {
    return await putApi(`annuncio / ${id}`, obj, header);
}

/* AUTH:ADMIN */
const annuncioDeleteApi = async (id, header) => {
    return await deleteApi(`annuncio / ${id}`, header);
}


export { annunciGetApi, annuncioDetailGetApi, annunciAccettazioneGetApi, annuncioModifyPutApi, annuncioDeleteApi, annuncioInsertMutiplePostApi, annuncioapprovePutAPi, annuncioDeclinePutApi, annuncioOnStrutturaGetApi, pendingAnnunciOnStruttura };

