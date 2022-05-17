import React from "react";
// import { navigate } from "../../../utils/Utils";
import { routes } from "../../../routes/routes";

 import { useNavigate } from "react-router-dom";



import { Outlet } from 'react-router-dom'

const Homepage = () => {

  let vector = useNavigate()

  const nav = () => {
    vector(routes.LOGIN)
  }
  const nav2 = () => {
    vector(routes.REGISTRATION)
  }

  return (
    <>
      <p>Home</p>
      <button onClick={nav}>Login</button>
      <button onClick={nav2}>Registration</button>
      <Outlet />
    </>
  );
};

export default Homepage
