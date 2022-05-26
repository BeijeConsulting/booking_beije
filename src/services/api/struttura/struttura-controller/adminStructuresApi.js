import { getApi, putApi } from '../../../genericServices'

/* AUTH:ADMIN */
const showPendingStructuresGetAllApi = async (header) => {
    return await getApi(`strutture/pending`, header);
}

/* AUTH:ADMIN */
const acceptPendingStructurePutApi = async (id, header) => {
    return await putApi(`strutture/pending/accept/${id}`, header);
}

/* AUTH:ADMIN */
const declinePendingStructurePutApi = async (id, obj, header) => {
    return await putApi(`strutture/pending/decline/${id}`, obj, header);
}

export {
    showPendingStructuresGetAllApi,
    acceptPendingStructurePutApi,
    declinePendingStructurePutApi
}
