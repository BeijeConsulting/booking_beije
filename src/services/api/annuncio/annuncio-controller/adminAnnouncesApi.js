import { getApi, putApi } from '../../../genericServices'

/* AUTH:ADMIN */
const showPendingAnnouncesGetAllApi = async (header) => {
    return await getApi(`annunci/admin`, header);
}

/* AUTH:ADMIN */
const acceptPendingAnnouncesPutApi = async (id, n, header) => {
    return await putApi(`annuncio/approve/${id}/${n}`, header);
}

/* AUTH:ADMIN */
const declinePendingAnnouncesPutApi = async (id, n, header) => {
    return await putApi(`annuncio/decline/${id}/${n}`, header);
}

export {
    showPendingAnnouncesGetAllApi,
    acceptPendingAnnouncesPutApi,
    declinePendingAnnouncesPutApi
}
