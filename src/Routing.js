import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from "./redux/ducks/tokenDuck";

// routes
import { routes } from "./routes/routes";

// Layout frontEnd
import Layout from './screens/frontEnd/layout/Layout'

//Screens frontEnd
import Home from "./screens/frontEnd/home/Homepage";
import Login from "./screens/frontEnd/login/Login";
import Bookings from "./screens/frontEnd/profileMenu/Bookings";
import Messages from "./screens/frontEnd/profileMenu/Messages";
import SingleConversation from "./screens/frontEnd/profileMenu/SingleConversation";
import Settings from "./screens/frontEnd/profileMenu/Settings";
import Registration from "./screens/frontEnd/registration/Registration";
import DetailsProp from "./screens/frontEnd/details/DetailsProp";
import DetailsPropRoom from "./screens/frontEnd/details/DetailsPropRoom";
import MostRewApart from "./screens/frontEnd/MRA";
import Account from "./screens/frontEnd/profileMenu/Account";
import Favourites from "./screens/frontEnd/profileMenu/Favourites";

//Screen backOffice
import ReservationCalendar from "./screens/backOffice/host/reservation/reservationCalendar/ReservationCalendar";
import ReservationList from "./screens/backOffice/host/reservation/reservationList/ReservationList";
import MessageChat from "./screens/backOffice/host/message/messageChat/MessageChat";
import HostAccount from "./screens/backOffice/host/account/hostAccount/HostAccount";
import MessageList from "./screens/backOffice/host/message/messageList/MessageList";
import StructureOperation from "./screens/backOffice/host/structure/structureOperations/StructureOperations";
import StructureList from "./screens/backOffice/host/structure/structureList/StructureList";
import StructureDetails from "./screens/backOffice/host/structure/structureDetails/StructureDetails";
import LayoutBackOffice from "./screens/backOffice/LayoutBackOffice";
import PendingAnnounceList from "./screens/backOffice/admin/announce/pendingAnnounceList/PendingAnnounceList";
// import HostRegistration from "./screens/backOffice/host/registration/hostRegistration/HostRegistration";
// import AnnounceOperations from "./screens/backOffice/host/announce/announceOperations/AnnounceOperations"

// NOTFOUND 
import NotFound from "./screens/notFound/NotFound";

import { getLocalStorage, setLocalStorage } from './utils/localStorage/localStorage'
// import { postApi, getApi } from "./services/genericServices";
// import { decryptItem } from "./utils/crypto/crypto";

// COMMON 
import Disclaimer from "./screens/frontEnd/disclaimer/Disclaimer";

function Routing(props) {
  useEffect(() => {
    // if (getLocalStorage('token') !== null){
    //     let token = getLocalStorage('token')
    //     props.dispatch(setToken(token))
    // }
    setLocalStorage(
      "token",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGdtYWlsLmNvbSIsInJvbGVzIjpbXSwiaWF0IjoxNjUyODgxMTEwLCJleHAiOjE2NTI4ODQ3MTB9.bq9aH8E9m0_t2x8NdT5Wknug7Yi-dXluMXqWLbPddBs"
    );

    // da qui in poi avete il token per fare tutte le chimate
  }, []);


  //login, registration, account, messages, favourites, booking

  return (
    <Routes>

      <Route path={routes.DISCLAIMER} element={<Disclaimer/>} />
      <Route path={routes.REGISTRATION} element={<Registration />} />
      <Route path={routes.LOGIN} element={<Login />} />

      {/* all the routes for frontEnd goes inside this one */}

      <Route path={routes.LAYOUT} element={<Layout />} >
        {/* NICE TO HAVE: <Route path:"travelTalks" element <TravelTalks> /> */}
        <Route path={routes.MESSAGES} element={<Messages />} />
        <Route path={routes.SINGLECONVERSATION} element={<SingleConversation />} />
        <Route path={routes.BOOKED} element={<Bookings />} />
        <Route path={routes.SETTINGS} element={<Settings />} />
        <Route path={routes.ACCOUNT} element={<Account />} />
        <Route path={routes.FAVOURITE} element={<Favourites />} />
        <Route index path={routes.HOME} element={<Home />} />
        <Route path={routes.DETAILSPROP} element={<DetailsProp />} />
        <Route path={routes.DETAILSPROPROOM} element={<DetailsPropRoom />} />
        <Route path={routes.MRA} element={<MostRewApart />} />
      </Route>


      {/* all the routes for backOffice goes inside this one */}
      <Route path={routes.DASHBOARD} element={<LayoutBackOffice />} >
        <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
        <Route path={routes.MESSAGE_LIST} element={<MessageList />} />
        <Route path={routes.MESSAGE_CHAT} element={<MessageChat />} />
        <Route path={routes.STRUCTURE_OPERATION} element={<StructureOperation />} />
        <Route path={routes.STRUCTURE_LIST} element={<StructureList />} />
        <Route path={routes.RESERVATION_CALENDAR} element={<ReservationCalendar />} />
        <Route path={routes.STRUCTURE_DETAILS} element={<StructureDetails />} />

        <Route path={routes.RESERVATION_LIST} element={<ReservationList />} />
        {/* //to add in admin route */}
        <Route path={routes.PENDING_ANNOUNCE_LIST} element={<PendingAnnounceList />} />
      </Route>

      {/* !!! we needd to change the element passed to path "*" */}
      <Route path="*" element={< NotFound />} />

    </Routes>
  )

}

const mapStateToProps = (state) => ({
  tokenDuck: state.tokenDuck,
});

export default connect(mapStateToProps)(Routing);