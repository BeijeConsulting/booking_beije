/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, postApi } from '../../genericServices'

const messageInsertPostApi = async (obj) => {
    return await postApi(`message`, obj);
}

const messageMultipleGetApi = async () => {
    return await postApi(`messages`);
}

/* AUTH:USER */
const messageToReceiverIdGetApi = async (reicever_id, header) => {
    return await getApi(`messages/receiver/${reicever_id}`, header);
}

/* AUTH:USER */
const messageToSenderIdGetApi = async (sender_id) => {
    return await getApi(`messages/sender/${sender_id
        }`);
}



/* AUTH:USER */
const messageRelativeAnnuncioGetApi = async (annuncio_id) => {
    return await postApi(`messages/annuncio/${annuncio_id}`);
}


/* AUTH:USER */
const messageDeleteApi = async (id, header) => {
    return await deleteApi(`message/${id}`, header);
}



export {
    messageInsertPostApi, messageMultipleGetApi, messageToReceiverIdGetApi, messageToSenderIdGetApi, messageRelativeAnnuncioGetApi, messageDeleteApi
}
