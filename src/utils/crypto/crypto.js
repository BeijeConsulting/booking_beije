import CryptoJS from "crypto-js";

const generateAESkey = () => {
  return String(CryptoJS.SHA256("beijebnb"));
};


/**
 * Return the item, but encrypted with AES
 * @param {Object} item MUST be object
 * @returns {string} stringified version of encripted item
 */
const encryptItem = (item) => {
    return CryptoJS.AES.encrypt(
    JSON.stringify(item),
    generateAESkey()
  ).toString();
};

/**
 * Return the decrypted Object
 * @param {string} encryptedItem  stringified version of AES encryption
 * @returns {Object} Decrypted Object
 */

const decryptItem = (encryptedItem) => {
  return JSON.parse(CryptoJS.AES.decrypt(encryptedItem, generateAESkey()).toString(
    CryptoJS.enc.Utf8
  ));
};

export {
    encryptItem,
    decryptItem
}