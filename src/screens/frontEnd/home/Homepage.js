import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
// import { navigate } from "../../../utils/Utils";
import { routes } from "../../../routes/routes";

import { useNavigate } from "react-router-dom";
// less 
import './Homepage.scss'
import '../../../assets/variables/_common.scss';
import SearchButton from "../../../components/frontEnd/funcComponents/ui/searchButton/SearchButton";
import Modal from "../../../components/common/modal/Modal";
import SearchForm from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/searchForm/SearchForm";

const Homepage = () => {

   const [state, setState] = useState({
      isOpen: false,
   });

   const { t } = useTranslation();
   const navigate = useNavigate()

   const handleNavigation = (path) => () => {
      navigate(path)
   }

   function handleClick() {
      setState({
         ...state,
         isOpen: !state.isOpen
      })
   }

   return (
      <>
         <Helmet>
            <title>{t("common.home")}</title>
         </Helmet>

         <Modal isOpen={state.isOpen} callback={handleClick}  >
            <SearchForm />
         </Modal>
         <div className="home oX1 w100 flex aiCenter jcCenter column">
            <SearchButton callback={handleClick} />
            <img onClick={handleNavigation(routes.LAYOUT)} className="homeImg ofC py1" src="https://i.ytimg.com/vi/69NY0fqd5Q0/maxresdefault.jpg" />
            <div className="suggested-container relative">
               <h3 className="absolute">{t("common.suggestedApartaments")}</h3>
               <img onClick={handleNavigation(`/${routes.MRA}`)} className="homeImg ofC py1" src="https://www.ourescapeclause.com/wp-content/uploads/2020/09/shutterstock_1037347711-scaled.jpg" />
            </div>
         </div>
      </>
   );
};

export default Homepage
