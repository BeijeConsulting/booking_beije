/* The following API are sorted by AUTH then with the following priority: GET->POST->PUT->PATCH->DELETE  */

import { getApi, deleteApi, putApi, postApi } from '../../genericServices'

const registerUserPostApi = async (obj) => {
    return await postApi(`user/registration`, obj);
}

/* AUTH:USER */
const myProfilesGetApi = async (header) => {
    return await getApi(`myprofile`, header);
}

/* AUTH:USER */
const confirmRegistrationGetApi = async (header) => {
    return await getApi(`registration/registrationConfirm`, header);
}

/* AUTH:USER */
const editProfileModifyPutApi = async (obj, header) => {
    return await putApi(`editprofile`, obj, header);
}

/* AUTH:USER */
const deactivateUserModifyPutApi = async (obj, header) => {
    return await putApi(`user`, obj, header);
}

/* AUTH:ADMIN */
const userIdGetApi = async (id, header) => {
    return await getApi(`user/${id}`, header);
}

/* AUTH:ADMIN */
const usersIdGetApi = async (header) => {
    return await getApi(`users`, header);
}

/* AUTH:ADMIN */
const userIdDeleteApi = async (id, header) => {
    return await deleteApi(`user/${id}`, header);
}

export { registerUserPostApi, myProfilesGetApi, confirmRegistrationGetApi, editProfileModifyPutApi, deactivateUserModifyPutApi, userIdGetApi, usersIdGetApi, userIdDeleteApi }
