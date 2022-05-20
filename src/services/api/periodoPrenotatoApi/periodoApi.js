/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'


const periodoPrenotatoIdGetApi = async (id) => {
    return await getApi(`periodo_prenotato/${id}`);
}


/* AUTH:USER */
const periodiPrenotatiUserGetApi = async (header) => {
    return await getApi(`periodi_prenotati/utente`, header);
}

/* AUTH:USER */
const periodoPrenotatoInsertPostApi = async (obj, header) => {
    return await postApi(`periodo_prenotato`, obj, header);
}


const periodoPrenotatoIdModifyPutApi = async (id, header) => {
    return await putApi(`periodo_prenotato/${id}`, header);
}

/* AUTH:HOST */
const periodiPrenotatiFromAnnuncioIdGetApi = async (id, header) => {
    return await getApi(`periodi_prenotati/annuncio/${id}`, header);
}

/* AUTH:HOST */
const periodiPrenotatiFromAnnuncioIdPresenteGetApi = async (id, header) => {
    return await getApi(`periodi_prenotati/annuncio/${id}/presente`, header);
}


const periodoPrenotatoIdDeleteApi = async (id, header) => {
    return await deleteApi(`periodo_prenotato/${id}`, header);
}

/* AUTH:ADMIN */
const periodiPrenotatiGetApi = async (header) => {
    return await getApi(`periodi_prenotati`, header);
}


export {
    periodoPrenotatoIdGetApi, periodiPrenotatiUserGetApi, periodoPrenotatoInsertPostApi, periodoPrenotatoIdModifyPutApi, periodiPrenotatiFromAnnuncioIdGetApi, periodiPrenotatiFromAnnuncioIdPresenteGetApi, periodoPrenotatoIdDeleteApi, periodiPrenotatiGetApi
}

