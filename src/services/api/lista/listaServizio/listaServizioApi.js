/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, postApi, deleteApi, putApi } from '../../genericServices'

const filterAnnunciServiceIdGetApi = async (service_id) => {
    return await getApi(`filter_annunci?service_id=${service_id}`);
}

const filterStruttureServiceIdGetApi = async (service_id) => {
    return await getApi(`filter_strutture?service_id=${service_id}`);
}

const serviceListGetApi = async () => {
    return await getApi(`service_lists`);
}

const serviceStruttureIdGetApi = async (structure_id) => {
    return await getApi(`services_for_structure?structure_id=${structure_id
        }`);
}

/* AUTH:HOST */
const addServiceListPostApi = async (obj, header) => {
    return await postApi(`add_service_list`, obj, header);
}

/* AUTH:HOST */
const serviceListModifyPutApi = async (id, obj, header) => {
    return await putApi(`update_service_list/${id}`, obj, header);
}


/* AUTH:HOST */
const deleteServiceListIdDeleteApi = async (id, header) => {
    return await deleteApi(`del_service_list/${id}`, header);
}

export {
    filterAnnunciServiceIdGetApi, filterStruttureServiceIdGetApi, serviceListGetApi, serviceStruttureIdGetApi, addServiceListPostApi, serviceListModifyPutApi, deleteServiceListIdDeleteApi
}