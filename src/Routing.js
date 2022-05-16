import React from "react";
import { Routes, Route } from 'react-router-dom';

// routes
import { routes } from "./routes/routes";

//Screens
import Home from './screens/frontEnd/home/Home'
//Screen backOffice
import MessageChat from './screens/backOffice/MessageChat/MessageChat'
import ReservationCalendar from './screens/backOffice/host/ReservationCalendar/ReservationCalendar'
import HostAccount from "./screens/backOffice/host/HostAccount/HostAccount";
import MessageList from "./screens/backOffice/host/MessageList/MessageList";
import StructureOperation from "./screens/backOffice/host/StructureOperation/StructureOperation";

function Routing() {
    return (
        <Routes>

            {/* all the routes for frontEnd goes inside this one */}
            <Route path={routes.HOME} element={<Home />}>

            </Route>


            {/* all the routes for backOffice goes inside this one */}
            <Route path={routes.DASHBOARD} element={<Home />}>
                <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
                <Route path={routes.MESSAGE_LIST} element={<MessageList />} />
                <Route path={routes.MESSAGE_CHAT} element={<MessageChat />} />
                <Route path={routes.STRUCTURE_OPERATION} element={<StructureOperation />} />
                <Route path={routes.RESERVATION_CALENDAR} element={<ReservationCalendar />} />
            </Route>

            {/* !!! we needd to change the element passed to path "*" */}
            <Route path="*" element={<Home />} />

        </Routes>
    )
}

export default Routing;
