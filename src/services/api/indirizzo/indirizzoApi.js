/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, putApi, postApi } from '../../genericServices'



const indirizziStruttureCittaGetApi = async (city) => {
    return await getApi(`show_all_indirizzi_by_citta/${city}`);
}

const indirizzoDetailGetApi = async (id) => {
    return await getApi(`show_indirizzo/${id}`);
}


/* AUTH:USER */
const indirizziStruttureGetApi = async () => {
    return await getApi(`show_all_indirizzi_struttura`);
}

/* AUTH:USER */
const indirizzoStrutturaInsertPostApi = async (obj, header) => {
    return await postApi(`insert_indirizzo_struttura`, obj, header);
}

/* AUTH:USER */
const indirizzoStrutturaModifyPutApi = async (id, obj, header) => {
    return await putApi(`update_indirizzo_struttura/${id}`, obj, header);
}

export { indirizziStruttureCittaGetApi, indirizzoDetailGetApi, indirizziStruttureGetApi, indirizzoStrutturaInsertPostApi, indirizzoStrutturaModifyPutApi }
