import React from 'react';

//REARCT-ROUTER-DOM
import { Navigate } from 'react-router-dom';


//UTILS
import { getLocalStorage } from '../../../utils/localStorage/localStorage';

const ProtectedRouteHost = ({ children }) => {

    // DA CONTROLARE!!!!1

    if (!getLocalStorage('token')) {
        return <Navigate to="/" />
    }
    else if (localStorage.getItem('permission') === "HOST") {
        return children;
    } else {
        return <Navigate to="/" />
    }
}


export default ProtectedRouteHost