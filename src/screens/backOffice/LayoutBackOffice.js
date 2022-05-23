import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Layout, Button, Grid } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../../components/backOffice/functionalComponent/sidebar/Sidebar";

import { Outlet } from "react-router-dom";
import Foo from "../../components/frontEnd/hookComponents/footer/Footer";
//UTILS
import { LinksFooterHost } from "../../utils/linksFooter/linksFooter";

const { Header, Sider, Content, Footer } = Layout;

const { useBreakpoint } = Grid;

const LayoutBackOffice = () => {
  const [state, setState] = useState({
    collapsed: false,
  });
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
    console.log(state.collapsed);
    setState({
      ...state,
      collapsed: !state.collapsed,
    });
  };

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{ padding: 0 }}
      ></Header>
      <Layout>
        {location.pathname.replaceAll("/", "") !== "dashboard" &&
          getBreakPoint() && (
            <Sider
              trigger={null}
              collapsed={state.collapsed}
              width={200}
              collapsible
            >
              {state.collapsed ? (
                <Button type="primary" onClick={toggleSidebar} block>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={"trigger"}
                    inverse
                  />
                </Button>
              ) : (
                <Button type="primary" onClick={toggleSidebar} block>
                  <FontAwesomeIcon
                    icon={faBars}
                    className={"trigger"}
                    inverse
                  />
                </Button>
              )}
              <Sidebar />
            </Sider>
          )}

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "70vh",
            width: "calc(100% - 200px)",
          }}
        >
          {location.pathname.replaceAll("/", "") !== "dashboard" ? (
            <Outlet />
          ) : (
            <p>Pannello da fare</p>
          )}
        </Content>
      </Layout>
      <Foo link={LinksFooterHost} />
    </Layout>
  );
};

export default LayoutBackOffice;
