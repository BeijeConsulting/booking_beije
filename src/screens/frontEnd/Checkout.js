import React, { useState, useEffect } from "react";

//RRD
import { useNavigate, useLocation } from 'react-router-dom'

//MODULES
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

//COMPONENTS
import LoginForm from '../../components/frontEnd/hookComponents/loginForm/LoginForm'
import GoBackButton from "../../components/backOffice/hookComponents/goBackButton/GoBackButton";

const Checkout = () => {

  let tot = 0

  const { t } = useTranslation();

  const navigate = useNavigate()
  const location = useLocation()

  const [state, setState] = useState({ windowWidth: window.innerWidth })

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  })


  let checkoutPropertyInfo = location.state.property
  let checkoutArrayList = location.state.checkOut


  function handleResize() {
    setState({
      ...state,
      windowWidth: window.innerWidth
    })
  }

  const goToPayment = () => { }

  function renderCheckoutList(item, key) {
    tot += item.price
    return (
      <div key={key} className="detail-info">
        <p>{item.title}</p>
        <p>{t("fe.screens.checkout.price")}:{item.price}&euro;</p>
        <p>{t("fe.screens.checkout.qty")}: {item.count}</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="checkout-container">
        {
          state.windowWidth < 991 &&
          <div className="back-button"><GoBackButton /></div>
        }

        <h1>Checkout</h1>

        <div className="structure-info-container">
          <div className="structure-photo-container" style={{ width: "100px", height: "100px", backgroundColor: "aqua" }}>
            IMG
          </div>
          <div className="structure-descriptions-container">
            <h3>{checkoutPropertyInfo.nome_struttura}</h3>
            <p>{checkoutPropertyInfo.descrizione}</p>
          </div>
        </div>

        <div className="details-info-container">
          <h3>{t("fe.screens.propertyDetails.details")}</h3>
          {
            checkoutArrayList.map(renderCheckoutList)
          }
          <p>{t("fe.screens.checkout.total")}: {tot}</p>
        </div>

        {
          localStorage.getItem('token') !== null ?
            <button onClick={goToPayment}>{t("fe.screens.checkout.confirmPayment")}</button>
            :
            <div className="checkout-login-form">
              <LoginForm isCheckout={true} checkoutProperty={checkoutPropertyInfo} checkoutList={checkoutArrayList} />
            </div>
        }

      </div>
    </>

  );
};

export default Checkout