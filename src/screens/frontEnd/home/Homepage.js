import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
// import { navigate } from "../../../utils/Utils";
import { routes } from "../../../routes/routes";

import { useNavigate } from "react-router-dom";
// less 
import './Homepage.less'
import SearchButton from "../../../components/frontEnd/funcComponents/ui/searchButton/SearchButton";

const Homepage = () => {

  const [state, setState] = useState({
    isOpen: false
  });

  const { t } = useTranslation();
  const navigate = useNavigate()

  const handleNavigation = (path) => () => {
    navigate(path)
  }

  function handleClick() {
    setState({
      ...state,
      isOpen: true
    })
  }

  return (
    <>
      <Helmet>
        <title>{t("common.home")}</title>
      </Helmet>
      <div className="home">
        <SearchButton callback={handleClick} />
        <img onClick={handleNavigation(routes.LAYOUT)} className="homeImg" src="https://i.ytimg.com/vi/69NY0fqd5Q0/maxresdefault.jpg" />
        <div>
          <h3>t('common.suggestedApartaments')</h3>
        <img onClick={handleNavigation(routes.LAYOUT)} className="homeImg" src="https://www.ourescapeclause.com/wp-content/uploads/2020/09/shutterstock_1037347711-scaled.jpg"/>
        </div>
      </div>
    </>
  );
};

export default Homepage
