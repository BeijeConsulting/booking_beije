import React from "react";
import { Routes, Route } from 'react-router-dom';

// routes
import { routes } from "./routes/routes";

//Screens
import Home from './screens/frontEnd/home/Home'
import HostAccount from "./screens/backOffice/host/HostAccount/HostAccount";

function Routing() {
    return (
        <Routes>

            {/* all the routes for frontEnd goes inside this one */}
            <Route path={routes.HOME} element={<Home />}>

            </Route>


            {/* all the routes for backOffice goes inside this one */}
            <Route path={routes.DASHBOARD} element={<Home />}>
                <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
            </Route>

            {/* !!! we needd to change the element passed to path "*" */}
            <Route path="*" element={<Home />} />

        </Routes>
    )
}

export default Routing;
