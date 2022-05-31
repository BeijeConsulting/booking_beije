import React, { useEffect, useState } from "react";

// modules
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { routes, routesDetails } from '../../../routes/routes'
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

//css
import "./DetailsProp.scss";

//api
import { strutturaDetailIdGetApi } from "../../../services/api/struttura/strutturaApi";
// import { serviceStruttureIdGetApi } from "../../../services/api/lista/listaServizio/listaServizioApi";
import { annuncioOnStrutturaGetApi } from "../../../services/api/annuncio/annuncioApi";
import { reviewsOnStrutturaIdGetApi } from "../../../services/api/recensioni/recensioniApi";

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// utils
import { setLocalStorage, getLocalStorageCheckout } from "../../../utils/localStorage/localStorage";

//components
// import Service from '../../../components/frontEnd/services/Service';
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import Rooms from '../../../components/frontEnd/funcComponents/rooms/Rooms';
import Modal from '../../../components/common/modal/Modal';
// import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";
import DetailsPropRoom from "./DetailsPropRoom";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import ReviewCard from "../../../components/frontEnd/funcComponents/reviewCards/ReviewCard";
import { serviceStruttureIdGetApi } from "../../../services/api/lista/listaServizio/listaServizioApi";

let checkOutArray = []
let arrayToCheckout = []

const DetailsProp = () => {

  const [state, setState] = useState({
    property: null,
    serviceList: null,
    roomsList: null,
    isContactHost: false,
    isDetailsRoom: false,
    checkOutList: [],
    checkOutPrice: 0,
    reviewsList: null,
    isLoading: true,
    windowWidth: window.innerWidth,
    storageRooms: getLocalStorageCheckout('checkout') || null
  })



  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const properties = await strutturaDetailIdGetApi(id)
      const rooms = await annuncioOnStrutturaGetApi(id)
      const review = await reviewsOnStrutturaIdGetApi(id)
      const services = await serviceStruttureIdGetApi(id)
      setState({
        ...state,
        property: properties?.data,
        roomsList: rooms?.data.list,
        reviewsList: review?.data,
        serviceList: services?.data,
        isLoading: false
      })
    }
   const { t } = useTranslation();

    const handleClose = (params) => () => {
      setState({
        ...state,
        [params]: false
      })
    }

    const addToCheckOut = (temp_id, isSelected, obj) => {
      console.log('qua', obj)
      isSelected ? checkOutArray[temp_id] = {
        ...obj,
        price: obj.price * obj.count,
        id: temp_id
      } : checkOutArray[temp_id] = undefined;
      let totalPrice = 0

      for (let index = 0; index < checkOutArray.length; index++) {
        if (checkOutArray[index] !== undefined) totalPrice += checkOutArray[index].price
      }
      setState({
        ...state,
        checkOutPrice: totalPrice
      })

      arrayToCheckout = checkOutArray.filter((element) => {
        return element !== undefined;
      })
    }
    const goToCheckout = () => {
      setLocalStorage('checkout', {
        property: state.property,
        checkOut: arrayToCheckout,
        totalPrice: state.checkOutPrice
      })
      navigate(routes.CHECKOUT, {
        state: {
          property: state.property,
          checkOut: arrayToCheckout
        }
      setState({
          ...state,
          checkOutPrice: totalPrice
        })

  const goToSelectedRoom = (id) => () => {
          navigate(`/${routesDetails.detailPropertyRoom(id)}`)
        }

  const generateRooms = (item, key) => {

          const isStored = state.storageRooms?.checkOut.find(room => room.id === key);
          console.log('item', item)
          return <Rooms
            callbackGoToRoom={goToSelectedRoom(item?.annuncio.id)}
            stored={isStored}
            key={key}
            numberOfPeople={item?.annuncio.numPostiLetto}
            title={item?.annuncio.titolo}
            price={item?.annuncio.prezzo}
            count={item?.annuncio.count}
            temp_id={key}
            services={item?.servizi.length > 0 ? item.servizi : state.serviceList}
            callback={addToCheckOut}
          />
        }

   const goToCheckout = () => {
          setLocalStorage('checkout', {
            property: state.property,
            checkOut: arrayToCheckout,
            totalPrice: state.checkOutPrice
          })
          navigate(routes.CHECKOUT, {
            state: {
              property: state.property,
              checkOut: arrayToCheckout
            }
          })
        }

   const goToSelectedRoom = (id) => () => {
          navigate(`/${routesDetails.detailPropertyRoom(id)}`)
        }

   const generateRooms = (item, key) => {
          let isStored = null
          isStored = state.storageRooms?.checkOut.find(room => room.id === key);
          return <Rooms
            callbackGoToRoom={goToSelectedRoom(item?.id)}
            stored={isStored}
            key={key}
            numberOfPeople={4} //da modificare
            title={item?.titolo}
            price={item?.prezzo}
            count={item?.count}
            temp_id={key}
            callback={addToCheckOut}
          />
        }

   const generateReviews = (item, key) => {

          return <ReviewCard
            key={key}
            username={`${item.user_id?.name} ${item.user_id?.surname}`}
            title={item.booking_id.annuncio?.descrizione}
            reviewDescription={item.text}
            rating={item.score}
          />
        }

   return(
      <>
        <Helmet>
          <title>{t("fe.screens.propertyDetails.details")}</title>
        </Helmet>
         { state.isLoading && <h1>Caricamento...</h1> }
         {!state.isLoading &&
      <div>
        <Modal
          callback={handleClose('isContactHost')}
          isOpen={state.isContactHost}
          classNameCustom={'modal contact-host-modal'}
        >
          {/* <ContactHost annuncioId={id} host={id} /> */}
        </Modal>

        <Modal
          callback={handleClose("isDetailsRoom")}
          isOpen={state.isDetailsRoom}
          classNameCustom={'modal contact-host-modal'}
        >
          <DetailsPropRoom />
        </Modal>

        {state.property === null || '' ? <p>{t("fe.screens.propertyDetails.noProperty")}</p> : <div className="property_container">
          <div className="container_img">
            {
              state.windowWidth < 992 &&
              <div className="back-button goBackProperty"><GoBackButton /></div>
            }
            <img className="structure_img_property first" src="https://p.bookcdn.com/data/Photos/380x250/8758/875870/875870843/Beb-Ampelea-photos-Exterior-Beb-Ampelea.JPEG" alt="img_struttura" />
            {
              state.windowWidth > 992 &&
              <div className="img_container_secondary">
                <img className="structure_img_property" src="https://fgvacanze.it/custom/fgvacanze/writable/htmlbox/benvenuti-ad-alghero.jpg" alt="img_struttura" />
                <img className="structure_img_property" src="https://www.viaggi-lowcost.info/wp-content/uploads/2019/08/alghero-spiaggia-maria-pia-e1565758733195.jpg" alt="img_struttura" />
                <img className="structure_img_property" src="https://www.bellavitainpuglia.it/Content/images/partner/5362/1920x0/f5c258c50945adabce83389016eb479e.jpg" alt="img_struttura" />
                <img className="structure_img_property" src="https://img.grouponcdn.com/deal/2Dz2zfRjTMjiQUUJgBdB8RswgYX3/2D-2048x1229/v1/t600x362.jpg" alt="img_struttura" />
              </div>
            }

          </div>
          <div className="padding_page">
            <div className="property_core_info_container">
              <div className="location_review">
                <h2>{state.property?.nome_struttura}</h2>
                <span>{`${state.property?.indirizzo.citta}, Via ${state.property?.indirizzo.via}`}</span>
                <p><FontAwesomeIcon icon={faStar} />{state.property?.media_recensioni}<span>{`(${state.property?.numero_recensioni})`}</span></p>
                <Like id={id} propertyName={state.property?.nome_struttura} />
              </div>
              <div className="description_container">
                <h3>{t("common.description")}</h3>
                <p>{state.property?.descrizione}</p>
                <span className="checkout_in_date">{`CheckIn: ${state.property?.checkin} - CheckOut: ${state.property?.checkout}`}</span>
              </div>
            </div>


            <div className="room_container">
              {state.roomsList?.map(generateRooms)}
            </div>
            <div className="total_price_container">
              <div className="container_price">
                <p>
                  {t('fe.screens.checkout.total')} {t('common.currency', { price: state.checkOutPrice })}
                </p>
                <UiButton
                  className="button_price"
                  callback={goToCheckout}
                  label={t("common.bookNow")}
                />
              </div>
            </div>
            <div className="map_container">
              <MapContainer style={{ width: '100%', height: '200px' }} center={[state.property.indirizzo.latitudine, state.property.indirizzo.longitudine]} zoom={13} scrollWheelZoom={true}>
                <Marker position={[state.property.indirizzo.latitudine, state.property.indirizzo.longitudine]}></Marker>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
            <div className="review_container">
              {state.reviewsList && state.reviewsList.map(generateReviews)}
            </div>
          </div>

        </div>
        }
      </div>
         }
      </>
   );
};
export default DetailsProp