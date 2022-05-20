import React from "react";

// modules
import { t } from "i18next";
import { Helmet } from "react-helmet";

const Bookings = () => {
  return (
    <>
    <Helmet>
      <title>{t("common.bookings")}</title>
    </Helmet>
      <p>{t("common.bookings")}</p>
    </>
  );
};

export default Bookings
