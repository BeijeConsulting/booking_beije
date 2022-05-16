import React from "react";
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";

// routes
import { routes } from "./routes/routes";

//Screens frontEnd
import Home from './screens/frontEnd/home/Homepage';

//Screen backOffice
import MessageChat from './screens/backOffice/host/messageChat/MessageChat';
import ReservationCalendar from './screens/backOffice/host/reservationCalendar/ReservationCalendar';
import HostAccount from "./screens/backOffice/host/hostAccount/HostAccount";

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

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck
})

export default connect(mapStateToProps)(Routing);
