import React, { useState, useEffect } from "react";
import { useNavigate, useLocation,useParams } from "react-router";
// less 
import './Layout.scss'
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
    let params = useParams()
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
        const arr = ['/settings', '/messages', `/singleconversation/${params.id}`, '/favourites', '/account', '/bookings'];

        const pathFound = arr.some((path) => location.pathname === path)

        return pathFound
      
    }
    return (
        <div className="layoutContainer">
            <Navbar stateLayout={state.windowWidth} />
            <Outlet/>
            {
                state.windowWidth > 991 &&
                <Footer link={LinksFooterGuest} />
            }
            {
                (state.windowWidth < 992 && (!checkPathForFooter())) &&
                <Footer link={LinksFooterGuest} />
            }
        </div>
    )
}

export default Layout