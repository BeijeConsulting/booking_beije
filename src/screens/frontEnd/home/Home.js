import React from "react";
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <p>Home</p>
      <Outlet />
    </>
  );
};

export default Home
