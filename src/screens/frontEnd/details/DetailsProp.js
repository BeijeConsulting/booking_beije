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
import Service from '../../../components/frontEnd/services/Service';
import Rooms from '../../../components/frontEnd/funcComponents/rooms/Rooms';
import Modal from '../../../components/common/modal/Modal';
import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";

let checkOutArray = []

const DetailsProp = () => {
  const [state, setState] = useState({
    property: null,
    serviceList: null,
    roomsList: null,
    isOpen: false,
    checkOutList: []
  })
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const properties = await strutturaDetailIdGetApi(id, "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdXRoQGhvc3QiLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCIsIkFETUlOIl0sImlhdCI6MTY1MzQ2NjI2MiwiZXhwIjoxNjUzNDY5ODYyfQ.QVnhW8j91eqCx0iAJmgj8j_T3NaABfebpf0u7bMUAzg")
      const services = await serviceStruttureIdGetApi(id)
      const rooms = await annuncioOnStrutturaGetApi(id)
      console.log(properties, services, rooms)
      setState({
        ...state,
        property: properties?.data,
        serviceList: services?.data,
        roomsList: rooms?.data
      })
      console.log(state)
      checkOutArray = Array.apply(null, Array(rooms?.data));
    })()
  }, [])

  const { t } = useTranslation();

  const generateRooms = (item, key) => {

    const addToCheckOut = (temp_id, isSelected) => {
      console.log(temp_id, isSelected)
    }

    return <Rooms
      key={key}
      numberOfPeople={4} //da modificare
      title={item?.titolo}
      price={item?.prezzo}
      count={item?.count}
      temp_id={key}
      callback={addToCheckOut}
    /* services={} da far aggiungere a BE*/
    /* numberOfNights={} da far aggiungere a BE*/
    />
  }

  const handleClose = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }

  return (
    <>
      {console.log(state)}
      <Helmet>
        <title>{t("fe.screens.propertyDetails.details")}</title>
      </Helmet>
      <Modal
        callback={handleClose}
        isOpen={state.isOpen}
        classNameCustom={'modal contact-host-modal'}
      >
        <ContactHost />
      </Modal>

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
        <div className="room_container">
          {state.roomsList?.map(generateRooms)}
        </div>
      </div>}
    </>
  );
};
export default DetailsProp