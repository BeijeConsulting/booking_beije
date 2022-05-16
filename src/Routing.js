import React from "react";
import { Routes, Route } from 'react-router-dom';

// routes
import { routes } from "./routes/routes";

//Screens
import Home from './screens/frontEnd/home/Homepage'
import Rooms from "./components/frontEnd/funcComponents/rooms/Rooms";
//Screen backOffice
/* import MessageChat from './screens/backOffice/MessageChat/MessageChat' */
import ReservationCalendar from './screens/backOffice/host/ReservationCalendar/ReservationCalendar'
import HostAccount from "./screens/backOffice/host/HostAccount/HostAccount";
import PropertyCards from "./components/frontEnd/funcComponents/propertyCards/PropertyCards";

function Routing() {
    return (
        <Routes>

            {/* all the routes for frontEnd goes inside this one */}
            <Route path={routes.HOME} element={<Rooms />}>

            </Route>


            {/* all the routes for backOffice goes inside this one */}
            <Route path={routes.DASHBOARD} element={<Home />}>
                <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
                {/* <Route path={routes.MESSAGE_CHAT} element={<MessageChat />} /> */}
                <Route path={routes.RESERVATION_CALENDAR} element={<ReservationCalendar />} />
            </Route>

            {/* !!! we needd to change the element passed to path "*" */}
            <Route path="*" element={<Home />} />

        </Routes>
    )
}

export default Routing;
