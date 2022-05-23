import React from "react";

// modules
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
import './profileMenuCSS/Bookings.less';
const Bookings = () => {
  const { t } = useTranslation();

  const openModal = () => {
    console.log("cliccato");
  }
  const closeModal = () => {
    console.log("cliccato");
  }

  return (
    <>
      <Helmet>
        <title>{t("common.bookings")}</title>
      </Helmet>
      <div className="bookings-page">

        <div className="back-button"></div>

        <h1 className="bookings-title">{t("common.bookings")}</h1>

        <div className="display">
          <button>{t("bo.screens.host.reservationList.calendar")}</button>
          <button>{t("bo.screens.host.reservationList.pending")}</button>
          <button>{t("bo.screens.host.reservationList.accepted")}</button>
          <button>{t("bo.screens.host.reservationList.rejected")}</button>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-info">
              <img src="https://cdn.britannica.com/65/140665-050-FB0989BF/Fairy-chimneys-hoodoos-Turkey-Goreme-National-Park.jpg" alt="card-img" />
              <div className="card-info-info">
                <h1>Chioggia spa</h1>
                <span>Chioggia, Italy</span>
                <span>30 Mar - 1 Apr</span>
                <button className="rate" onClick={openModal}>{t("common.rate")}</button>
              </div>
            </div>
            <span className="price">90,00€</span>
          </div>
        </div>

        {/* <div className="modal-container">
          <button className="closeModal" onClick={closeModal}>X</button>
          <div className="card-modal">

            <div className="modal-info">
              <img src="https://cdn.britannica.com/65/140665-050-FB0989BF/Fairy-chimneys-hoodoos-Turkey-Goreme-National-Park.jpg" alt="card-img" />
              <div className="modal-info-info">
                <h1>Chioggia spa</h1>
                <span>Chioggia, Italy</span>
                <span>30 Mar - 1 Apr</span>
              </div>
            </div>

            <div>
              Host img | host name
            </div>

            <div className="rating">
              <input type="text" className="titleR" placeholder="Rating title" />
              <textarea className="" name="" id="" rows="5" placeholder="255 char." />
            </div>

            <div className="rateIt-cont">
              <span>stelle</span>
              <button className="rateIt">{t("common.rate")}</button>
            </div>

          </div>
        </div> */}
      </div>
    </>
  );
};

export default Bookings
