import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// import { eventBus } from "../../eventBus/eventBus";

import "./LayoutBackOffice.scss";

import { Layout, Button, Grid } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../../components/backOffice/functionalComponent/sidebar/Sidebar";
import Dasboard from './host/dashboard/Dashboard'

import { Outlet } from "react-router-dom";
import Foo from "../../components/frontEnd/hookComponents/footer/Footer";
//UTILS
import { LinksFooterHost } from "../../utils/linksFooter/linksFooter";

const { Header, Sider, Content } = Layout;

const { useBreakpoint } = Grid;

const LayoutBackOffice = () => {
  const [state, setState] = useState({ collapsed: false });

  useEffect(() => {
    // eventBus.onListening('prova', toggleSidebar)

    return () => {
      // eventBus.onRemoveEventListener('prova')
    };
  }, [state.collapsed]);

  const location = useLocation();
  const screens = useBreakpoint();

  const getBreakPoint = () => {
    const { xs, sm, ...other } = screens;
    let checkOther = false;
    for (const property in other) {
      if (other[property] === true) {
        checkOther = true;
        break;
      }
    }
    return checkOther;
  };

  const toggleSidebar = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  const routeWithoutSidebar = () => {
    switch (location.pathname.replaceAll("/", "")) {
      case "dashboard":
        return false
      case "dashboardhost-registration":
        return false
      default:
        console.log(location.pathname.replaceAll("/", ""));
        return true;
    }

  }

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{ padding: 0 }}
      ></Header>
      <Layout>
        { routeWithoutSidebar() &&
          getBreakPoint() && (
            <Sider
              trigger={null}
              collapsed={state.collapsed}
              width={200}
              collapsible
            >
              <Button
                style={{
                  backgroundColor: "#44403c",
                  border: "none",
                  paddingLeft: `${state.collapsed ? "" : "24px"}`,
                }}
                type="primary"
                onClick={toggleSidebar}
                block={state.collapsed ? true : false}
              >
                <FontAwesomeIcon
                  icon={state.collapsed ? faAngleRight : faBars}
                  className={"trigger"}
                  inverse
                />
              </Button>

              <Sidebar />
              <Button
                style={{
                  backgroundColor: "#44403c",
                  border: "none",
                  paddingLeft: `${state.collapsed ? "" : "24px"}`,
                  position: "absolute",
                  bottom: 5

                }}
                type="primary"
                onClick={() => console.log("Logout")}
                block={state.collapsed ? true : false}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className={"trigger"}
                  inverse
                />
                <span className={`logoutButton ${!state.collapsed ? "visible" : "hide"}`} >Logout</span>
              </Button>
            </Sider>
          )}

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "70vh",
            // width: "calc(100% - 200px)",
          }}
        >
          {location.pathname.replaceAll("/", "") !== "dashboard"  ? (
            <Outlet />
          ) : (
            <Dasboard />
          )}
        </Content>
      </Layout>
      <Foo link={LinksFooterHost} />
    </Layout>
  );
};

export default LayoutBackOffice;
