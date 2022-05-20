import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
// less 
import './Layout.less'
// Routes
import { routes } from "../../../routes/routes";
// component 
import Navbar from "../../../components/frontEnd/hookComponents/navbar/Navbar";
import Footer from "../../../components/frontEnd/hookComponents/footer/Footer";
// Outlet 
import { Outlet } from "react-router";

import { LinksFooterGuest } from "../../../utils/linksFooter/linksFooter";
const Layout = () => {
    const [state, setState] = useState({
        windowWidth: window.innerWidth,
    })
    let vector = useNavigate();
    let location = useLocation();

    useEffect(() => {
        function handleResize() {
            setState({
                ...state,
                windowWidth: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)

        if (location.pathname === "/") {
            vector(routes.HOME)
        }
        return () => { window.removeEventListener('resize', handleResize) }
    })

    const checkPathForFooter = () => {
        const arr = ['/settings', '/messages', '/singleConversation', '/favourites', '/account', '/bookings'];

        const test = arr.some((x) => location.pathname === x)
        return test
        // if (location.pathname !== "settings" || location.pathname !== "messages" !==)
    }
    return (
        <div className="layoutContainer">
            <Navbar stateLayout={state.windowWidth} />
            <Outlet />
            {
                state.windowWidth > 480 &&
                <Footer link={LinksFooterGuest} />
            }
            {
                (state.windowWidth < 480 && (!checkPathForFooter())) &&
                <Footer link={LinksFooterGuest} />
            }
        </div>
    )
}

export default Layout