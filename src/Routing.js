import React from "react";
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";

// routes
import { routes } from "./routes/routes";

//Screens frontEnd
import Home from './screens/frontEnd/home/Homepage';
import Login from './screens/frontEnd/login/Login'
import Bookings from './screens/frontEnd/account/Bookings'
import Messages from './screens/frontEnd/account/Messages'
import SingleConversation from './screens/frontEnd/account/SingleConversation'
import Settings from './screens/frontEnd/account/Settings'

//Screen backOffice
import ReservationCalendar from './screens/backOffice/host/reservation/reservationCalendar/ReservationCalendar'
import MessageChat from './screens/backOffice/host/message/messageChat/MessageChat'
import HostAccount from "./screens/backOffice/host/account/hostAccount/HostAccount";
import MessageList from './screens/backOffice/host/message/messageList/MessageList'
import StructureOperation from './screens/backOffice/host/structure/structureOperations/StructureOperations'
import StructureList from "./screens/backOffice/host/structure/structureList/StructureList";
import StructureDetails from "./screens/backOffice/host/structure/structureDetails/StructureDetails";

import LayoutBackOffice from "./screens/backOffice/LayoutBackOffice";

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
            {/* all the routes for frontEnd goes inside this one */}
            {/* <Route path={routes.HOME} element={<Rooms />}> */}

            {/* </Route> */}


            {/* all the routes for backOffice goes inside this one */}
            <Route path={routes.DASHBOARD} element={<LayoutBackOffice />} >
                <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
                <Route path={routes.MESSAGE_LIST} element={<MessageList />} />
                <Route path={routes.MESSAGE_CHAT} element={<MessageChat />} />
                <Route path={routes.STRUCTURE_OPERATION} element={<StructureOperation />} />
                <Route path={routes.STRUCTURE_LIST} element={<StructureList />} />
                <Route path={routes.RESERVATION_CALENDAR} element={<ReservationCalendar />} />
                <Route path={routes.STRUCTURE_DETAILS} element={<StructureDetails />} />

            </Route>

            {/* !!! we needd to change the element passed to path "*" */}
            <Route path="*" element={<Home />} />

        </Routes>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck
})

export default connect(mapStateToProps)(Routing);
