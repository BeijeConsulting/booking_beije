import { getApi, postApi, putApi, deleteApi } from "../services/genericServices";
import { getLocalStorage } from "../utils/localStorage/localStorage";

const useApi = () => {

    // ANNUNCI

    const ROOMS = ["annunci", "annunci/accettazione", "annuncio"]

    const getRooms = async () => {
        return await getApi(ROOMS[0]);
    }

    const roomsApproval = async () => {
        return await getApi(ROOMS[1]);
    }

    const roomDetail = async (id) => {
        return await getApi(`${ROOMS[2]}/${id}`);
    }

    const roomOnProperty = async (id) => {
        return await getApi(`${ROOMS[2]}/struttura/${id}`);
    }

    /* AUTH:HOST */
    const roomModify = async (id, obj, header) => {
        return await putApi(`${ROOMS[2]}/${id}`, obj, header);
    }

    /* AUTH:HOST */
    const roomInsertMultiple = async (quantity, obj, header) => {
        return await postApi(`${ROOMS[2]}/${quantity}`, obj, header);
    }
    /* AUTH:ADMIN */
    const roomApprovePutApi = async (id, obj, header) => {
        return await putApi(`${ROOMS[2]}/${id}`, obj, header);
    }
    /* AUTH:ADMIN */
    const roomDecline = async (id, obj, header) => {
        return await putApi(`${ROOMS[2]}/${id}`, obj, header);
    }

    /* AUTH:ADMIN */
    const roomDelete = async (id, header) => {
        return await deleteApi(`annuncio/${id}`, header);
    }

    // END ANNUNCI

    // AUTH
    const AUTH = ["index", "signin", "updateAuthToken"]

    const auth = async () => {
        return await getApi(AUTH[0]);
    }

    const signIn = async (obj) => {
        return await postApi(AUTH[1], obj);
    }
    /* AUTH:isLogged */
    const updateAuthToken = async () => {
        return await postApi(AUTH[2], {
            refreshToken: getLocalStorage('refreshToken')
        });
    }

    // END AUTH

    //  CREDIT CARD
    const CARD = ["cards", "card"];

    /* AUTH:USER */
    const getCards = async (header) => {
        return await getApi(CARD[0], header);
    }

    /* AUTH:USER */
    const cardInsert = async (obj, header) => {
        return await postApi(CARD[1], obj, header);
    }
    /* AUTH:USER */
    const cardModify = async (obj, header) => {
        return await putApi(CARD[1], obj, header);
    }

    /* AUTH:USER */
    const cardDelete = async (id, header) => {
        return await deleteApi(`${CARD[1]}/${id}`, header);
    }
    //  END CARD

    // PHOTOS
    const PHOTO = "foto_annunci"

    const getRoomsPhoto = async () => {
        return await getApi(PHOTO);
    }

    const roomsPhotoDetail = async (id) => {
        return await getApi(`${PHOTO}/${id}`);
    }

    /* AUTH:HOST */
    const roomsPhotoInsert = async (obj, header) => {
        return await postApi(PHOTO, obj, header);
    }

    /* AUTH:HOST */
    const roomsPhotoModify = async (id, obj, header) => {
        return await putApi(`${PHOTO}/${id}`, obj, header);
    }

    /* AUTH:HOST */
    const roomsPhotoDelete = async (id, header) => {
        return await deleteApi(`${PHOTO}/${id}`, header);
    }

    //  END PHOTO

    // IMAGE
    const IMAGE = ["images", "image", "insert_image", "update_image", "delete_image"]; 

    const GetImages = async () => {
        return await getApi(IMAGE[0]);
    }
    
    const getImageDetail = async (id) => {
        return await getApi(`${IMAGE[1]}/${id}`);
    }
    
    /* AUTH:HOST */
    const imageInsert = async (obj, header) => {
        return await postApi(IMAGE[2], obj, header);
    }
    
    /* AUTH:HOST */
    const imageModify = async (id, obj, header) => {
        return await putApi(`${IMAGE[3]}/${id}`, obj, header);
    }
    
    /* AUTH:ADMIN */
    const imageDelete = async (id, header) => {
        return await deleteApi(`${IMAGE[4]}/${id}`, header);
    }


    return {
        getRooms,
        roomsApproval,
        roomDetail,
        roomDecline,
        roomDelete,
        roomApprovePutApi,
        roomInsertMultiple,
        roomOnProperty,
        roomModify,
        auth,
        signIn,
        updateAuthToken,
        cardDelete,
        cardInsert,
        cardModify,
        getCards,
        roomsPhotoDelete,
        roomsPhotoDetail,
        getRoomsPhoto,
        roomsPhotoInsert,
        roomsPhotoModify,
        imageDelete,
        imageInsert,
        imageModify,
        getImageDetail,
        GetImages,
    }
}

export default useApi;