import React from "react";

// module
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const DetailsProp = () => {

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("fe.screens.propertyDetails.details")}</title>
      </Helmet>
      <p>Property</p>
    </>
  );
};

export default DetailsProp