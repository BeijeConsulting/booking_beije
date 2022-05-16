import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";

const Login = () => {

  let vector = useNavigate();

  const nav = () => {
    vector(routes.BOOKED);
  // }
  // const nav2 = () => {
  //   vector(routes.MESSAGES);
  // }
  // const nav3 = () => {
  //   vector(routes.SINGLECONVERSATION);

  // }
  // const nav4 = () => {
  //   vector(routes.SETTINGS)

   }

  return (
    <>
      <p>login</p>
      <button onClick={nav}>Bookings</button>
      {/* <button onClick={nav2}>messages</button>
      <button onClick={nav3}>conversation</button>
      <button onClick={nav4}>settings</button> */}
    </>
  );
};

export default Login