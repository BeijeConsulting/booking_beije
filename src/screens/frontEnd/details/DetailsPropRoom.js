import React, { useEffect, useState } from "react";


import defaultImg from '../../../assets/images/homeplaceholder.png'
// scss 
import './DetailsPropRoom.scss'

// modules
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { annuncioDetailGetApi } from "../../../services/api/annuncio/annuncioApi";

import Modal from '../../../components/common/modal/Modal';
import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
// import applicationStore from "../../../applicationStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

const DetailsPropRoom = (props) => {

   const { t } = useTranslation();
   const { id } = useParams();

   const [state, setState] = useState({
      propertyRooms: null,
      images: [],
      isOpen: false,
      windowWidth: window.innerWidth
   })

   useEffect(() => {
      console.log(id, 'paramsid')
      annuncioDetailGetApi(id).then(res => {
         console.log(res?.data)
         setState({
            ...state,
            images: res?.data?.immagini,
            propertyRooms: res?.data?.annuncio
         })
      });
   }, [])
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
   // close modal 
   const handleClose = () => {
      setState({
         ...state,
         isOpen: !state.isOpen
      })
   }
   // open modal 
   const contactHostModal = () => {
      setState({
         ...state,
         isOpen: true
      })
   }
   const renderIcon = () => {
      let userIcon = [];
      for (let index = 0; index < state.propertyRooms?.annuncio?.numPostiLetto; index++) {
         userIcon.push(<span key={index}>
            <FontAwesomeIcon icon={faUser} />
         </span>);
      }
      return userIcon
   }
   return (
      <>
         <Helmet>
            <title>{t("fe.screens.propertyDetails.roomDetails")}</title>
         </Helmet>
         <div className="property_room_container">
            <div className="container_img">
               {
                  state.windowWidth < 992 &&
                  <>
                     <div className="back-button goBackProperty"><GoBackButton cssCustom="go_back_btn" /></div>
                     {
                        state.images?.length > 0 ?
                           <img className="announce_img_property first" src={state.images[0]} alt="img-annuncio" /> :
                           <img className="announce_img_property first" src={defaultImg} alt="img-annuncio" />
                     }
                  </>
               }

               {
                  state.windowWidth > 992 &&

                  <>
                     {
                        state.images?.length > 0 ?
                           <>
                              <img className="announce_img_property first" src={state.images[0]} alt="img-annuncio" />

                              <div className="img_container_secondary">
                                 <img className="announce_img_property" src={state.images[1]} alt="img_struttura" />
                                 <img className="announce_img_property" src={state.images[2]} alt="img_struttura" />
                                 <img className="announce_img_property" src={state.images[3]} alt="img_struttura" />
                                 <img className="announce_img_property" src={state.images[4]} alt="img_struttura" />
                              </div>
                           </>
                           :

                           <img className="announce_img_property_default first" src={defaultImg} alt="img-annuncio" />

                     }
                  </>


               }

            </div>
            <h2>{state.propertyRooms?.titolo}</h2>
            <div className="price_checkout_in_date">
               <span>
                  {`${t('common.currencyTwoFractionDigits', { price: state.propertyRooms?.prezzo })}/${t('fe.components.rooms.priceForNumberOfNights', { count: 1 })}`}</span>
            </div>
            <div className="description_container_room">
               <h3>{t('common.description')}</h3>
               <p>{state.propertyRooms?.descrizione}</p>
            </div>
            <div>
               <p>numero di posti letto disponibili</p>
               {
                  state.propertyRooms?.numPostiLetto < 5 ?
                     <>
                        {renderIcon}
                     </>
                     :
                     <>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>
                           {t('fe.components.rooms.people', { count: state.propertyRooms?.numPostiLetto })}
                        </span>
                     </>

               }
            </div>
            <button onClick={contactHostModal}>{t('fe.modals.contactHostModal.contactHost')}</button>
            <Modal isOpen={state.isOpen} callback={handleClose}>
               <ContactHost hostId={state.propertyRooms?.struttura?.host?.user?.id} />
            </Modal>
         </div>
      </>
   );
};

export default DetailsPropRoom