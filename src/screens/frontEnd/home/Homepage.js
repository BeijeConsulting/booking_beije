import React from "react";
// import { navigate } from "../../../utils/Utils";
import { routes } from "../../../routes/routes";

 import { useNavigate } from "react-router-dom";




const Homepage = () => {

  let vector = useNavigate()

  const nav = () => {
    vector(routes.LOGIN)
  }

  return (
    <>
      <p>Home</p>
      <button onClick={nav}>Login</button>
    </>
  );
};

export default Homepage
