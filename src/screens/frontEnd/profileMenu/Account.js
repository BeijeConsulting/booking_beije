import React from "react";

// modules
import { t } from "i18next";
import { Helmet } from "react-helmet";


const Account = () => {
  return (
    <>
    <Helmet>
      <title>{t("common.account")}</title>
    </Helmet>
      <p>dashboard</p>
    </>
  );
};

export default Account
