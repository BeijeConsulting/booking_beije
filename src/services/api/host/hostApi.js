import { postApi } from '../../genericServices'

const hostRequestPost = async (param, header, obj) => {
    return await postApi(`hosts/request?CompanyName=${param.companyName}&iva=${param.iva}`, obj, header)
}


export {
    hostRequestPost
}