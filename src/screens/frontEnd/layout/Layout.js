import React, { useEffect } from "react";
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

import { LinksFooterGuest,LinksFooterHost } from "../../../utils/linksFooter/linksFooter";
const Layout = () => {
    let vector = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            vector('home')
        }
    }, [])


    return (
        <div className="layoutContainer">
            <Navbar />
            <Outlet />
            <Footer link={LinksFooterHost} />
        </div>
    )
}

export default Layout