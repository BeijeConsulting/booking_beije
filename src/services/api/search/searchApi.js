import { getApi } from "../../genericServices";

const RESOURCE = 'searchPointMap';
const getStructuresBySearch = async (searchObject) => {
   return await getApi(`${RESOURCE}/${searchObject}`);
}

export {getStructuresBySearch}