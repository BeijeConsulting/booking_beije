import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
// import { navigate } from "../../../utils/Utils";
// import { routes } from "../../../routes/routes";

// import { useNavigate } from "react-router-dom";
// less 
import './Homepage.less'

const Homepage = () => {

  const { t } = useTranslation();
  // let vector = useNavigate()


  return (
    <>
      <Helmet>
        <title>{t("common.home")}</title>
      </Helmet>
      <div className="home">
        <p>{t("common.home")}</p>
        <img src="https://www.raicultura.it/cropgd/900x520/dl/img/2020/04/08/1586351246504_abstract-2468874_1920.jpg"></img>
        <img src="https://www.raicultura.it/cropgd/900x520/dl/img/2020/04/08/1586351246504_abstract-2468874_1920.jpg"></img>

      </div>
    </>
  );
};

export default Homepage
