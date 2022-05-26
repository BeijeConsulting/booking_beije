import React, { useEffect, useState } from "react";
// module
import { Helmet } from "react-helmet";



//rrd
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from '../../../routes/routes'

//css
import "./DetailsProp.scss";
// REACT LEAFLET
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import Map from '../../../components/frontEnd/hookComponents/map/Map'

//hooks
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//api
import { strutturaDetailIdGetApi } from "../../../services/api/struttura/strutturaApi";

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { serviceStruttureIdGetApi } from "../../../services/api/lista/listaServizio/listaServizioApi";

//util
import { annuncioOnStrutturaGetApi } from "../../../services/api/annuncio/annuncioApi";

//components
import Service from '../../../components/frontEnd/services/Service';
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import Rooms from '../../../components/frontEnd/funcComponents/rooms/Rooms';
import Modal from '../../../components/common/modal/Modal';
import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";
import DetailsPropRoom from "./DetailsPropRoom";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import { reviewsOnStrutturaIdGetApi } from "../../../services/api/recensioni/recensioniApi";
import ReviewCard from "../../../components/frontEnd/funcComponents/reviewCards/ReviewCard";

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
    reviewsList : null,
    windowWidth: window.innerWidth,

    isLoading: false
  })

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const properties = await strutturaDetailIdGetApi(id)
      const rooms = await annuncioOnStrutturaGetApi(id)
      const review = await reviewsOnStrutturaIdGetApi(id)
      console.log(properties, 'stazmne', rooms, review)
      setState({
        ...state,
        property: properties?.data,
        roomsList: rooms?.data.list,
        reviewsList: review?.data,
        isLoading: true
      })
      console.log(state)
      checkOutArray = Array.apply(null, Array(rooms?.data.length));
    })()
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
  const { t } = useTranslation();

  const handleClose = (params) => () => {
    setState({
      ...state,
      [params]: false
    })
  }

  const addToCheckOut = (temp_id, isSelected, obj) => {
    isSelected ? checkOutArray[temp_id] = {
      ...obj,
      price: obj.price * obj.count
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
    navigate(routes.CHECKOUT, {
      state: {
        property: state.property,
        checkOut: arrayToCheckout
      }
    })
  }

  const generateRooms = (item, key) => {

    return <Rooms
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

  return (
    <>
      <Helmet>
        <title>{t("fe.screens.propertyDetails.details")}</title>
      </Helmet>

      {state.isLoading &&
        <div>
          <Modal
            callback={handleClose('isContactHost')}
            isOpen={state.isContactHost}
            classNameCustom={'modal contact-host-modal'}
          >
            <ContactHost />
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
                </div>
                <div className="description_container">
                  <h3>{t("common.description")}</h3>
                  <p>{state.property?.descrizione}</p>
                  <span className="checkout_in_date">{`CheckIn: ${state.property?.checkin} - CheckOut: ${state.property?.checkout}`}</span>
                </div>
              </div>

              {/* regole da aggiungere appena pronte */}
              <div className="room_container">
                {state.roomsList?.map(generateRooms)}
              </div>
              <div className="total_price_container">
                <p>Total {state.checkOutPrice}&euro;</p>
                <UiButton
                  callback={goToCheckout}
                  label={t("common.bookNow")} />
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
                {state.reviewsList?.map(generateReviews)}
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