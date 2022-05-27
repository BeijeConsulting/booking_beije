import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setToken } from "./redux/ducks/tokenDuck";

import { myProfilesGetApi } from './services/api/user/userApi'
// routes
import { routes } from "./routes/routes";

// Layout frontEnd
import Layout from './screens/frontEnd/layout/Layout'

//Screens frontEnd
import Home from "./screens/frontEnd/home/Homepage";
import Login from "./screens/frontEnd/login/Login";
import Bookings from "./screens/frontEnd/profileMenu/Bookings";
import Chat from "./screens/frontEnd/profileMenu/Chat";
import Messages from "./screens/frontEnd/profileMenu/Messages";
import SingleConversation from "./screens/frontEnd/profileMenu/SingleConversation";
import Settings from "./screens/frontEnd/profileMenu/Settings";
import Registration from "./screens/frontEnd/registration/Registration";
import DetailsProp from "./screens/frontEnd/details/DetailsProp";
import DetailsPropRoom from "./screens/frontEnd/details/DetailsPropRoom";
import MostRewApart from "./screens/frontEnd/MRA";
import Account from "./screens/frontEnd/profileMenu/Account";
import Favourites from "./screens/frontEnd/profileMenu/Favourites";
import Search from "./screens/frontEnd/Search";
import Checkout from "./screens/frontEnd/Checkout";

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
import AnnounceOperations from "./screens/backOffice/host/announce/announceOperations/AnnounceOperations"

// NOTFOUND 
import NotFound from "./screens/notFound/NotFound";

import { getLocalStorage } from './utils/localStorage/localStorage'

// COMMON 
import Disclaimer from "./screens/frontEnd/disclaimer/Disclaimer";
import HostRegistration from "./screens/backOffice/host/registration/hostRegistration/HostRegistration";
import { setUser } from "./redux/ducks/userDuck";
import ProtectedRoute from "./components/common/protectedRoute/ProtectedRoute";
import { logout } from "./utils/user/user";
import { setProperty } from "./redux/ducks/propertyDuck";
import { showAllStruttureGetApi } from "./services/api/struttura/strutturaApi";



function Routing(props) {
    useEffect(() => {
        (async () => {
            if ((localStorage.getItem('token') && localStorage.getItem('refreshToken')) !== null) {

                try {
                    logout();
                    let token = getLocalStorage('token');
                    props.dispatch(setToken(token));
                    const PROFILE = await myProfilesGetApi(token);
                    const PROPERTY = await showAllStruttureGetApi();
                    props.dispatch(setUser(PROFILE?.data));
                    props.dispatch(setProperty(PROPERTY?.data?.list));
                } catch (error) {
                    return error.message
                }
            }
        })()


    }, []);


    //login, registration, account, messages, favourites, booking

    return (
        <Routes>

            <Route path={routes.DISCLAIMER} element={<Disclaimer />} />
            <Route path={routes.REGISTRATION} element={<Registration />} />
            <Route path={routes.LOGIN} element={<Login />} />

            {/* all the routes for frontEnd goes inside this one */}

            <Route path={routes.LAYOUT} element={<Layout />} >
                {/* NICE TO HAVE: <Route path:"travelTalks" element <TravelTalks> /> */}
                <Route path={routes.MESSAGES} element={
                    <ProtectedRoute>
                        <Messages />
                    </ProtectedRoute>
                }
                />

                <Route path={routes.SINGLECONVERSATIONMOBILE} element={
                    <ProtectedRoute>
                        <SingleConversation />
                    </ProtectedRoute>
                }
                />

                <Route path={routes.CHAT} element={  //da vedere perchè non prende la rotta figlia
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                }
                >
                    <Route path={routes.SINGLECONVERSATION} element={<SingleConversation />} />
                </Route>

                <Route path={routes.BOOKINGS} element={
                    <ProtectedRoute>
                        <Bookings />
                    </ProtectedRoute>
                }
                />

                <Route path={routes.SETTINGS} element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
                />
                <Route path={routes.ACCOUNT} element={
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                }
                />

                <Route path={routes.FAVOURITES} element={
                    <ProtectedRoute>
                        <Favourites />
                    </ProtectedRoute>
                }
                />

                <Route path={routes.CHECKOUT} element={<Checkout />} />

                <Route index path={routes.HOME} element={<Home />} />
                <Route path={routes.DETAILSPROP} element={<DetailsProp />} />
                <Route path={routes.DETAILSPROPROOM} element={<DetailsPropRoom />} />
                <Route path={routes.MRA} element={<MostRewApart />} />
                <Route path={routes.SEARCH} element={<Search />} />
            </Route>


            {/* all the routes for backOffice goes inside this one */}
            <Route path={routes.DASHBOARD} element={<LayoutBackOffice />} >
                <Route path={routes.HOST_ACCOUNT} element={<HostAccount />} />
                <Route path={routes.MESSAGE_LIST} element={<MessageList />} />
                <Route path={routes.MESSAGE_CHAT} element={<MessageChat />} />
                <Route path={`${routes.STRUCTURE_OPERATION}/:id`} element={<StructureOperation />} />
                <Route path={routes.STRUCTURE_LIST} element={<StructureList />} />
                <Route path={routes.RESERVATION_CALENDAR} element={<ReservationCalendar />} />
                <Route path={routes.STRUCTURE_DETAILS} element={<StructureDetails />} />
                <Route path={routes.HOST_REGISTRATION} element={<HostRegistration />} />
                <Route path={routes.RESERVATION_LIST} element={<ReservationList />} />
                <Route path={routes.ANNOUNCE_OPERATION} element={<AnnounceOperations />} />

                {/* //to add in admin route */}
                <Route path={routes.PENDING_ANNOUNCE_LIST} element={<PendingAnnounceList />} />
            </Route>

            {/* !!! we needd to change the element passed to path "*" */}
            <Route path="*" element={< NotFound />} />

        </Routes>
    )

}


export default connect()(React.memo(Routing));