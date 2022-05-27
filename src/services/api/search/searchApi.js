import { getApi } from "../../genericServices";

const RESOURCE = 'search';

export const getStructuresBySearch = async (searchObject) => {
   return await getApi(`${RESOURCE}?${searchObject}`);
}