import React from "react";
import { Outlet } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
      <p>Home</p>
      <Outlet />
    </>
  );
};

export default Homepage
