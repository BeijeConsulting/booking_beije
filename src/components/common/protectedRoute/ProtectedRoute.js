import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

 const ProtectedRoute = ({ children }) => {

  if (!getLocalStorage('token')) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;