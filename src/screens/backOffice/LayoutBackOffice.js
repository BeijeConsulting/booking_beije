import React, { useState } from "react";
import { Layout, Button } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../../components/backOffice/functionalComponent/sidebar/Sidebar";

import { Outlet } from "react-router-dom";
import Foo from "../../components/frontEnd/hookComponents/footer/Footer";
//UTILS
import { LinksFooterHost } from "../../utils/linksFooter/linksFooter";

const { Header, Sider, Content, Footer } = Layout;

const LayoutBackOffice = () => {
  const [state, setState] = useState({
    collapsed: false,
  });

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
        <Sider trigger={null} collapsed={state.collapsed} collapsible>
          {state.collapsed ? (
            <Button type="primary" onClick={toggleSidebar} block>
              <FontAwesomeIcon icon={faAngleRight} className={"trigger"} inverse />
            </Button>
          ) : (
            <Button type="primary" onClick={toggleSidebar} block>
              <FontAwesomeIcon icon={faBars} className={"trigger"} inverse />
            </Button>
          )}
          <Sidebar />
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Foo link={LinksFooterHost} />
    </Layout>
  );
};

export default LayoutBackOffice;
