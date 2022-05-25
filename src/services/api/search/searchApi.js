import { getSearchApi } from "../../genericServices";

const RESOURCE = 'searchPointMap';
const getStructuresBySearch = async (params = null, body) => {
   return await getSearchApi(`${RESOURCE}?${params}`, body);
}




export {getStructuresBySearch}