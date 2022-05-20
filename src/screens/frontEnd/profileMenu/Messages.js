import React from "react";

// modules
import { t } from "i18next";
import { Helmet } from "react-helmet";

const Messages = () => {
  return (
    <>
    <Helmet>
      <title>{t("fe.screens.settings.settingsCard.messages")}</title>
    </Helmet>
      <p>Messages</p>
    </>
  );
};

export default Messages
