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

import { LinksFooterGuest } from "../../../utils/linksFooter/linksFooter";
const Layout = () => {
    let vector = useNavigate();
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            vector(routes.HOME)
        }
    }, [])


    return (
        <div className="layoutContainer">
            <Navbar />
            <Outlet />
            <Footer link={LinksFooterGuest} />
        </div>
    )
}

export default Layout