/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

/* AUTH:HOST */
const indirizzoStruttura = async (quantity, obj, header) => {
    return await postApi(`annuncio/${quantity}`, obj, header);
}
