import { deleteApi, postApi, getApi, putApi } from "../../../genericServices";

const RESOURCES = [
   'delete_structura_images',
   'insert_structure_image',
   'structura_images',
   'structure_images',
   'update_structura_image'
];

/**
 * Deletes a structure image, given an id, calling deleteApi()
 * @param  {number} imageId
 * @returns {Promise} deletes a structure image
 */
const deleteStructureImages = async (imageId) => {
   return await deleteApi(`${RESOURCES[0]}/${imageId}`);
}

/**
 * Adds a structure image, given an object and the user token (only if permission as host or admin), calling postApi()
 * @param  {object} object
 * @param  {string} token
 * @returns {Promise} adds a structure image
 */
const addStructureImage = async (object, token) => {
   return await postApi(RESOURCES[1], object, token);
}

/**
 * Gets one structure image, given the structure id, calling getApi()
 * @param  {number} structureId
 * @returns {object} an object containing the structure image
 */
const getStructureImage = async (structureId) => {
   return await getApi(`${RESOURCES[2]}/${structureId}`);
}

/**
 * Gets all the structure images, calling getApi()
 * @returns {object} an object containing all the structures images
 */
const getAllStructureImages = async () => {
   return await getApi(RESOURCES[3]);
}
/**
 * Updates a structure image, given its id, calling putApi() and passing the new object to it, and given the user token (only if permission as host)
 * @param  {number} imageId
 * @param  {object} imageObject the object containing the new image
 * @param  {string} token
 */
const updateStructureImage = async (imageId, imageObject, token) => {
   return await putApi(`${RESOURCES[4]}/${imageId}}`, imageObject, token);
}

export {
   deleteStructureImages,
   addStructureImage,
   getStructureImage,
   getAllStructureImages,
   updateStructureImage
}