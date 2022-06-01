import React, { useState, useEffect } from "react";

import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

// modules
import Helmet from "react-helmet";
import { t } from "i18next";

// routing
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";

// style
import './NotFound.scss';


const NotFound = () => {

   const [state, setState] = useState({
      windowWidth: window.innerWidth
   });

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(routes);
   }

   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })

   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   return (
      <>
         <Helmet>
            <title>{t("fe.screens.pageNotFound.pageTitle")}</title>
         </Helmet>

         <div className='not-found-page flex column jcSpaceB'>
            <div>
               {
                  state.windowWidth < 991 &&
                  <GoBackButton />
               }
               <h1 className="title">{t('fe.screens.pageNotFound.pageTitle')}</h1>
               <p>{t('fe.screens.pageNotFound.pageDescription')}</p>
            </div>

            <div className="txt w100">
               <a href="#" onClick={handleNavigation(routes.LAYOUT)}>{t('common.backToHome')}</a>
            </div>

         </div>
      </>
   );
};

export default NotFound
