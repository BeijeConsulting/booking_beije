import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// utils 
import { servicesToIcons } from '../../../utils/serviceIdToFAIcon/servicesToIcons';

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

import { Carousel } from 'antd';
import { routes } from "../../../routes/routes";


const DetailsPropRoom = (props) => {
   const vector = useNavigate()
   const { t } = useTranslation();
   const { id } = useParams();

   const [state, setState] = useState({
      propertyRooms: null,
      images: [],
      services: [],
      isOpen: false,
      windowWidth: window.innerWidth
   })

   useEffect(() => {
      annuncioDetailGetApi(id).then(res => {
         setState({
            ...state,
            services: res?.data?.servizi,
            images: res?.data?.immagini,
            propertyRooms: res?.data?.annuncio
         })
      }).catch((error) => {
         vector(routes.NOTFOUND)
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
   const renderImage = (img, key) => {

      return (
         <img key={key} className="img_carousel" src={img?.urlImage} alt="img_struttura" />
      )
   }
   const generateServicesIcon = ((service, index) => {
      const serviceType = servicesToIcons.find(serv => serv.id === service.id)
      return <span key={index}>
         <FontAwesomeIcon className="services_icon" icon={serviceType.icon} />
      </span>
   })
   return (
      <>
         <Helmet>
            <title>{t("fe.screens.propertyDetails.roomDetails")}</title>
         </Helmet>
         <div className="announce_room_container">
            {
               state?.windowWidth < 992 &&

               <div className="back-button"><GoBackButton /></div>
            }

            {state?.images?.length > 0 ?
               <>
                  <Carousel autoplay>
                     {state?.images?.map(renderImage)}
                  </Carousel>
               </> :
               <img className="img_carousel" src={defaultImg} alt="img_struttura" />
            }
            <section className="padding_page">
               <h2>{state?.propertyRooms?.titolo}</h2>
               <div className="price_checkout_in_date">
                  <span>
                     {`${t('common.currencyTwoFractionDigits', { price: state?.propertyRooms?.prezzo })}/${t('fe.components.rooms.priceForNumberOfNights', { count: 1 })}`}</span>
               </div>
               <div className="description_container_room">
                  <h3>{t('common.description')}</h3>
                  <p>{state?.propertyRooms?.descrizione}</p>
               </div>
               <div>
                  <h3>numero di posti letto disponibili</h3>
                  {
                     state?.propertyRooms?.numPostiLetto < 5 ?
                        <>
                           {renderIcon}
                        </>
                        :
                        <>
                           <FontAwesomeIcon icon={faUsers} />
                           <span className="number_people">
                              {t('fe.components.rooms.people', { count: state?.propertyRooms?.numPostiLetto })}
                           </span>
                        </>

                  }
               </div>
               {
                  state?.services?.length > 0 &&
                  <div>
                     {state?.services.map(generateServicesIcon)}
                  </div>
               }

               <div className="contact-host">
                  <button onClick={contactHostModal}>{t('fe.modals.contactHostModal.contactHost')}</button>
               </div>
               <Modal isOpen={state?.isOpen} callback={handleClose}>
                  <ContactHost propertyRoomsImage={state?.images} propertyRooms={state?.propertyRooms} />
               </Modal>
            </section>
         </div>
      </>
   );
};

export default DetailsPropRoom