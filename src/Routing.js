import React from "react";
import { Routes, Route } from 'react-router-dom';

// routes
import { routes } from "./routes/routes";

//Screens
import Home from './screens/frontEnd/home/Homepage'

import Login from './screens/frontEnd/login/Login'
import Bookings from './screens/frontEnd/account/Bookings'
import Messages from './screens/frontEnd/account/Messages'
import SingleConversation from './screens/frontEnd/account/SingleConversation'
import Settings from './screens/frontEnd/account/Settings'



function Routing() {
  return (
    <Routes>

      <Route path={routes.HOME} element={<Home />}></Route>

      {/* all the routes for frontEnd goes inside this one */}
      <Route path={routes.LOGIN} element={<Login />}>
        <Route path={routes.BOOKED} element={<Bookings />}></Route>
        <Route path={routes.MESSAGES} element={<Messages />}></Route>
        <Route path={routes.SINGLECONVERSATION} element={<SingleConversation />}></Route>
        <Route path={routes.SETTINGS} element={<Settings />}></Route>
      </Route>


      {/* all the routes for backOffice goes inside this one */}
      <Route path={routes.DASHBOARD} element={<Home />}>

      </Route>

      {/* !!! we needd to change the element passed to path "*" */}
      <Route path="*" element={<Home />} />

    </Routes>
  )
}

export default Routing;
