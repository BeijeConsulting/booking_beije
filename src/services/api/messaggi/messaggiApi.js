/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, postApi } from '../../genericServices'

const messageInsertPostApi = async (obj, header) => {
    return await postApi(`message`, obj, header);
}

const messageMultipleGetApi = async () => {
    return await postApi(`messages`);
}


/* AUTH:USER (MESSAGES PAGE)*/
// const chatMessagesUserGetApi = async (header) =>{
//     return await getApi(`messages/chat`, header);
// }
const chatMessagesUserGetApi = async (header, itemsPerPage = 100, page = 1) => {
    return await getApi(`messages/chat?itemsPerPage=${itemsPerPage}&page=${page}`, header);
}

/* AUTH:USER (SINGLECONVERSATIONPAGE)*/
const messageToSenderIdGetApi = async (sender_id, header) => {
    return await getApi(`messages/chat/${sender_id
        }`, header);
}

/* AUTH:USER */
const messageRelativeAnnuncioGetApi = async (annuncio_id) => {
    return await postApi(`messages/annuncio/${annuncio_id}`);
}


/* AUTH:USER */
const messageDeleteApi = async (id, header) => {
    return await deleteApi(`message/${id}`, header);
}

/* AUTH:HOST */
const messageListHostGetApi = async (page = 1, itemsPerPage = 5, header) => {
    return await getApi(`messages/chat?page=${page}&itemsPerPage=${itemsPerPage}`, header);
}
/* AUTH:HOST */
const messageChatHostGetApi = async (id, header) => {
    return await getApi(`messages/chat/${id}`, header);
}
/* AUTH:HOST */
const messageSendForGuestApi = async (obj, header) => {
    return await postApi(`message`, obj, header);
}

/* AUTH:HOST */
const messageGetAdmin = async (header) => {
    return await getApi(`messages`, header);
}

export {
    chatMessagesUserGetApi,
    messageInsertPostApi,
    messageMultipleGetApi,
    messageToSenderIdGetApi,
    messageRelativeAnnuncioGetApi,
    messageDeleteApi,
    messageListHostGetApi,
    messageChatHostGetApi,
    messageSendForGuestApi,
    messageGetAdmin
}
