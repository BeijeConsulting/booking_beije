import React from "react";

// modules
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const DetailsPropRoom = () => {

  const {t} = useTranslation();

  return (
    <>
    <Helmet>
      <title>{t("fe.screens.propertyDetails.roomDetails")}</title>
    </Helmet>
      <p>Property Room</p>
    </>
  );
};

export default DetailsPropRoom