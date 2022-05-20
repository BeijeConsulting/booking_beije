import React from "react";

import { eventBus } from "../../../../eventBus/eventBus";

//ANT Design
import { Menu } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";

//Font-Awesome
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faWallet,
  faBookOpen,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { t } = useTranslation();

  const toggleSidebar = () => {
    console.log("qui sidebar");
    eventBus.onDispatch("collapseSidebar", {});
  };

  return (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <FontAwesomeIcon icon={faHotel} />,
            label: t("bo.components.sidebar.structure"),
            onClick: toggleSidebar,
          },
          {
            key: "2",
            icon: <FontAwesomeIcon icon={faWallet} />,
            label: t("bo.components.sidebar.payments"),
          },
          {
            key: "3",
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            label: t("bo.components.sidebar.reservations"),
          },
          {
            key: "4",
            icon: <FontAwesomeIcon icon={faMessage} />,
            label: t("bo.components.sidebar.messages"),
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
