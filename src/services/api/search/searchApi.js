import { getApi } from "../../genericServices";

const RESOURCE = 'searchPointMap';
const getStructuresBySearch = async (searchObject) => {
   return await getApi(`${RESOURCE}/${searchObject}`);
}

// const getStructuresBySearch = async (params = null, body) => {

//    return await getSearchApi(`${RESOURCE}?${params}`, body);
// }

export {getStructuresBySearch}