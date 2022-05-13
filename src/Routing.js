import React from "react";

import {Routes, Route} from 'react-router-dom'

//Screens
import Home from './screens/frontEnd/home/Home'

function Routing() {
  return (
    <Routes>

      {/* all the routes for frontEnd goes inside this one */}
      <Route path="/" element={<Home/>}>

      </Route>


    {/* all the routes for backOffice goes inside this one */}
    <Route path="dashboard" element={<Home />}>

    </Route>

    </Routes>
  )
}

export default Routing;
