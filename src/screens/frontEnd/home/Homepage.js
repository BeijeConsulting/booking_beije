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

         <div className="container_home oX1 w100">
            <div className="search_container">
               <SearchButton callback={handleClick} />
            </div>
            <div className="home">
               <h3> Travel Talk </h3>
               <div className="travel_talk" onClick={handleNavigation(routes.LAYOUT)}>
               </div>
               <h3> Non sai dove andare? </h3>
               <div onClick={handleNavigation(`/${routes.MRA}`)} className="suggested-container relative fsXXL">
                  <h3 className="title_suggested">{t("common.suggestedApartaments")}</h3>
               </div>
            </div>
         </div>
      </>
   );
};

export default Homepage
