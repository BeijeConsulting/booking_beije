import React, { useEffect, useState } from "react";

// module
import { Helmet } from "react-helmet";

//hooks
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

//api
import { strutturaDetailIdGetApi } from "../../../services/api/struttura/strutturaApi";

//localstorage
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { serviceStruttureIdGetApi } from "../../../services/api/lista/listaServizio/listaServizioApi";

//util
import { annuncioOnStrutturaGetApi } from "../../../services/api/annuncio/annuncioApi";

//components
import Service from '../../../components/frontEnd/services/Service'
import Rooms from '../../../components/frontEnd/funcComponents/rooms/Rooms'

const DetailsProp = () => {
  const [state, setState] = useState({
    property: null,
    serviceList: null,
    roomsList: null
  })
  const { id } = useParams();
  ;

  useEffect(() => {
    (async () => {
      const properties = await strutturaDetailIdGetApi(id, "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRoQGhvc3QiLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCIsIkFETUlOIl0sImlhdCI6MTY1MzM5NDUzNSwiZXhwIjoxNjUzMzk4MTM1fQ.7K9M9kooTBoAl0moPd7kyRtOBJWitZXP1h4hCknIlms")
      const services = await serviceStruttureIdGetApi(id)
      const rooms = await annuncioOnStrutturaGetApi(id)
      setState({
        property: properties?.data,
        serviceList: services?.data,
        roomsList: rooms?.data
      })
      console.log(state)
    })()
  }, [])

  const { t } = useTranslation();

  const generateServices = (item, key) => {
    //completare una volta sistemata la lista dei servizi
    return <Service
      key={key}
      serviceId={1}
    />
  }

  const generateRooms = (item, key) => {

    return <Rooms
      key={key}
      numberOfPeople={state.roomsList?.numPostiLetto}
      title={state.roomsList?.titolo}
      price={state.roomsList?.prezzo}
    /* services={} da far aggiungere a BE*/
    /* numberOfNights={} da far aggiungere a BE*/
    />
  }
  return (
    <>
      <Helmet>
        <title>{t("fe.screens.propertyDetails.details")}</title>
      </Helmet>
      {state.property === null || '' ? <p>{t("fe.screen.propertyDetails.noProperty")}</p> : <div className="property_container">
        <img></img>
        <h2>{state.property?.nome_struttura}</h2>
        <div className="property_core_info_container">
          <div className="location_review">
            <span>{`${state.property?.indirizzo.citta}, Via ${state.property?.indirizzo.via}`}</span>
            <p><FontAwesomeIcon icon={faStar} />{state.property?.media_recensioni}<span>{`(${state.property?.numero_recensioni})`}</span></p>
          </div>
          <div className="checkout_in_date">
            <span>{`CheckIn: ${state.property?.checkin} - CheckOut: ${state.property?.checkout}`}</span>
          </div>
        </div>
        <div className="description_container">
          <h3>{t("common.description")}</h3>
          <p>{state.property?.descrizione}</p>
        </div>
        <div className="service_container">
          {state.serviceList?.map(generateServices)}
        </div>
        {/* regole da aggiungere appena pronte */}
        <div className="room_container">
          {state.roomsList?.map(generateRooms)}
        </div>
      </div>}
    </>
  );
};
export default DetailsProp