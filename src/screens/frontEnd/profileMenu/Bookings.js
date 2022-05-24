import React, { useEffect, useState } from "react";

// modules
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

//function
import { CurrentDate } from "../../../utils/date/date";
//ui
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";

//api
import { periodiPrenotatiUserGetApi } from '../../../services/api/periodoPrenotatoApi/periodoApi'

//redux
import { connect } from 'react-redux';
import { decryptItem } from "../../../utils/crypto/crypto";
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//css
import './profileMenuCSS/Bookings.scss';
import Modal from '../../../components/common/modal/Modal';
import Rate from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/rate/Rate";



let arrayBkp = [];

const Bookings = (props) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    PeriodListStructure: [],
    isOpen: false
  })

  const dateCurrent = CurrentDate();

  useEffect(() => {
    periodiPrenotatiUserGetApi(
      props.tokenDuck?.token === null ? getLocalStorage('token') :
        decryptItem(props.tokenDuck?.token)).then(res => {
          arrayBkp = res.data.length > 0 ? res.data : [];
          setState({
            ...state,
            PeriodListStructure: arrayBkp.filter((item) => {
              return item.statoAccettazione == "ACCETTATO" && item.data_fine < dateCurrent;
            })
          })
        })
  }, [])

  const buttonType =
    [t("fe.screens.bookings.history"), t("fe.screens.bookings.pending"), t("fe.screens.bookings.planned"), t("fe.screens.bookings.refused")];

  const popolateSwitchButton = ((item, key) => {
    return <UiButton key={key} label={item} callback={filterByButtonType} />
  })


  /* This funciton filter the state delegate to popolate the apartment list based on the pressed button */
  const filterByButtonType = (e) => {
    let arrayTest = []
    switch (e.target.innerText) {
      case t("fe.screens.bookings.history"):
        arrayTest = arrayBkp.filter((item) => {
          return item.statoAccettazione == "ACCETTATO" && item.data_fine < dateCurrent;
        })
        break;
      case t("fe.screens.bookings.pending"):
        arrayTest = arrayBkp.filter((item) => {
          return item.statoAccettazione == "IN ATTESA";
        })
        break;
      case t("fe.screens.bookings.planned"):
        arrayTest = arrayBkp.filter((item) => {
          return item.statoAccettazione == "ACCETTATO" && item.data_inizio > dateCurrent;
        })
        break;
      case t("fe.screens.bookings.refused"):
        arrayTest = arrayBkp.filter((item) => {
          return item.statoAccettazione == "RIFIUTATO";
        })
        break;
      default:
        return;
    }
    setState({
      ...state,
      PeriodListStructure: arrayTest
    })
  }

  const handleClose = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }

  return (
    <div className="bookings-page">
      <Helmet>
        <title>{t("common.bookings")}</title>
      </Helmet>
      <button onClick={() => setState({
        ...state,
        isOpen: !state.isOpen
      })}>bau</button>
      <Modal 
      callback={handleClose} 
      isOpen={state.isOpen}>
        <Rate /> {/* prop for property id */}
      </Modal>
      <h1 className="bookings-title">{t("common.bookings")}</h1>

      <div className="button_switch_container display">
        {buttonType.map(popolateSwitchButton)}
      </div>

      <div className="apartment_container card-container">
        {state.PeriodListStructure.length <= 0 ? <p>{t("common.noApartments")}</p> : state.PeriodListStructure.map((item, key) => {
          return (
            <p key={key}>{item.annuncio.titolo}</p>
            //         <div className="card-container">
            //           <div className="card">
            //             <div className="card-info">
            //               <img src="{item.annuncio.url_image}" alt="card-img" />
            //               <div className="card-info-info">
            //                 <h1>{item.annuncio.titolo}</h1>
            //                 <span>{item.annuncio.luogo}</span>
            //                 <span>{item.annuncio.checkin}, {item.annuncio.checkout}</span>
            //                 <button className="rate" onClick={openModal}>{t("common.rate")}</button>
            //               </div>
            //             </div>
            //             <span className="price">{item.annuncio.prezzo}</span>
            //           </div>
            //         </div>
          )
        })}
      </div>
    </div>

    //       <div className="bookings-page">

    //         <div className="back-button"></div>

    //         <h1 className="bookings-title">{t("common.bookings")}</h1>

    //         <div className="display">
    //           <button>{t("bo.screens.host.reservationList.calendar")}</button>
    //           <button>{t("bo.screens.host.reservationList.pending")}</button>
    //           <button>{t("bo.screens.host.reservationList.accepted")}</button>
    //           <button>{t("bo.screens.host.reservationList.rejected")}</button>
    //         </div>

    //         <div className="card-container">
    //           <div className="card">
    //             <div className="card-info">
    //               <img src="https://cdn.britannica.com/65/140665-050-FB0989BF/Fairy-chimneys-hoodoos-Turkey-Goreme-National-Park.jpg" alt="card-img" />
    //               <div className="card-info-info">
    //                 <h1>Chioggia spa</h1>
    //                 <span>Chioggia, Italy</span>
    //                 <span>30 Mar - 1 Apr</span>
    //                 <button className="rate" onClick={openModal}>{t("common.rate")}</button>
    //               </div>
    //             </div>
    //             <span className="price">90,00€</span>
    //           </div>
    //         </div>

    //          <div className="modal-container">
    //           <button className="closeModal" onClick={closeModal}>X</button>
    //           <div className="card-modal">

    //             <div className="modal-info">
    //               <img src="https://cdn.britannica.com/65/140665-050-FB0989BF/Fairy-chimneys-hoodoos-Turkey-Goreme-National-Park.jpg" alt="card-img" />
    //               <div className="modal-info-info">
    //                 <h1>Chioggia spa</h1>
    //                 <span>Chioggia, Italy</span>
    //                 <span>30 Mar - 1 Apr</span>
    //               </div>
    //             </div>

    //             <div>
    //               Host img | host name
    //             </div>

    //             <div className="rating">
    //               <input type="text" className="titleR" placeholder="Rating title" />
    //               <textarea className="" name="" id="" rows="5" placeholder="255 char." />
    //             </div>

    //             <div className="rateIt-cont">
    //               <span>stelle</span>
    //               <button className="rateIt">{t("common.rate")}</button>
    //             </div>

    //           </div>
    //         </div> 
    //       </div>
    //     </>
  );
};

const mapStateToProps = state => ({
  userDuck: state.userDuck,
  tokenDuck: state.tokenDuck
});

export default connect(mapStateToProps)(Bookings)
