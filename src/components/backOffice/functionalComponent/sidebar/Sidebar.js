import React from "react";

import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";

import { eventBus } from "../../../../eventBus/eventBus";

//ANT Design
import { Menu, Button } from "antd";

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

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <FontAwesomeIcon icon={faHotel} />,
            label: t("bo.components.sidebar.structure"),
            onClick: () => goTo(routes.STRUCTURE_LIST),
          },
          {
            key: "2",
            icon: <FontAwesomeIcon icon={faBookOpen} />,
            label: t("common.bookings"),
            onClick: () => goTo(routes.RESERVATION_LIST),
          },
          {
            key: "3",
            icon: <FontAwesomeIcon icon={faMessage} />,
            label: t("common.messages"),
            onClick: () => goTo(routes.MESSAGE_LIST),
          },
          {
            key: "4",
            icon: <FontAwesomeIcon icon={faWallet} />,
            label: t("bo.components.sidebar.payments"),
            // onClick: () => eventBus.onDispatch('prova', {}),
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
