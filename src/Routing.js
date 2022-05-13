import React from "react";

import { Routes, Route } from 'react-router-dom'

//Screens
import Home from './screens/frontEnd/home/Homepage'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default Routing;
