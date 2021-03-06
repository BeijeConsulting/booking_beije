import React, { useState, useEffect } from "react";
import "./Checkout.scss";
//RRD
// import { useNavigate, useLocation } from 'react-router-dom'

//MODULES
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

//COMPONENTS
// import LoginForm from '../../components/frontEnd/hookComponents/loginForm/LoginForm'
import GoBackButton from "../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { getLocalStorageCheckout, removeLocalStorage } from "../../utils/localStorage/localStorage";
import PropertyCard from "../../components/frontEnd/classComponents/ui/propertyCard/PropertyCard";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
   const navigate = useNavigate();
   let tot = 0

   const { t } = useTranslation();
   const checkoutList = getLocalStorageCheckout('checkout')
   console.log('chk', checkoutList)
   const [state, setState] = useState({ windowWidth: window.innerWidth })

   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })

   let checkoutPropertyInfo = checkoutList?.property
   let checkoutArrayList = checkoutList?.checkOut


   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   const goToPayment = () => {
      alert(t('fe.screens.checkout.paymentSuccessful'))
      removeLocalStorage('checkout')
      navigate("/")
   }


   function renderCheckoutList(item, key) {
      tot += item.price
      return (
         <div key={key} className="detail-info">
            <p>{`${item.title} n:${item.count}`}</p>
            <p>{t('common.currencyTwoFractionDigits', { price: item.price })}</p>
         </div>
      )
   }

   return (
      <>
         <Helmet>
            <title>{t('fe.screens.checkout.checkoutPageTitle')}</title>
         </Helmet>

         <div className="checkout-container">
            {
               state.windowWidth < 991 &&
               <div className="back-button"><GoBackButton /></div>
            }

            <h1 className="title_checkout_container">{t('fe.screens.checkout.checkoutPageTitle')}</h1>

            <div className="structure-info-container">
               <PropertyCard
                  data={{
                     struttura: {
                        nome: checkoutPropertyInfo?.nome_struttura,
                        tipologia: checkoutPropertyInfo?.descrizione
                     },
                     media_recensioni: checkoutPropertyInfo?.media_recensioni,
                  }}
               />
               {/*  <div className="structure-photo-container" style={{ width: "100px", height: "100px", backgroundColor: "aqua" }}>
            IMG
          </div>
          <div className="structure-descriptions-container">
            <h3>{checkoutPropertyInfo?.nome_struttura}</h3>
            <p>{checkoutPropertyInfo?.descrizione}</p>
          </div> */}
            </div>

            <div className="details-info-container">
               <h3>{t("fe.screens.propertyDetails.details")}</h3>
               {
                  checkoutArrayList?.map(renderCheckoutList)
               }
               <div className="line_out"><div className="line"></div></div>

               <div className="detail-info">
                  <p>{t("fe.screens.checkout.total")}:</p>
                  <p>{tot}</p>
               </div>
            </div>
            <div className="button_container">
               <button className="button_on" onClick={goToPayment}>{t("fe.screens.checkout.confirmPayment")}</button>
            </div>
         </div>
      </>

   );
};

export default Checkout