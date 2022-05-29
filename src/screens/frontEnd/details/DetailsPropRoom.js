import React, { useEffect, useState } from "react";

// modules
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import UiSelect from "../../../components/frontEnd/funcComponents/ui/uiSelect/UiSelect"
import { annuncioDetailGetApi } from "../../../services/api/annuncio/annuncioApi";

import Modal from '../../../components/common/modal/Modal';
import ContactHost from "../../../components/frontEnd/classComponents/pageComponents/modalChildrenComponent/contactHost/ContactHost";
// import applicationStore from "../../../applicationStore";

const DetailsPropRoom = (props) => {

  const { t } = useTranslation();
  const { id } = useParams();

  const [state, setState] = useState({
    propertyRooms: null,
    isOpen: false,
  })

  useEffect(() => {
    annuncioDetailGetApi(id).then(res => {
      console.log(res.data?.struttura?.host?.user?.id)
      setState({
        propertyRooms: res.data
      })
    });
  }, [])

  // close modal 
  const handleClose = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }
  // open modal 
  const contactHostModal = () =>{
    setState({
      ...state,
      isOpen: true
    })
  }

  return (
    <>
      <Helmet>
        <title>{t("fe.screens.propertyDetails.roomDetails")}</title>
      </Helmet>
      <div className="property_room_container">
        <h2>{state.propertyRooms?.titolo}</h2>
        <div className="price_checkout_in_date">
          <span>{`${state.propertyRooms?.prezzo}/${t('fe.components.rooms.night')}`}</span>
        </div>
        <div className="selected_container">
          <UiButton
            label={t('common.selected')}
          />
          <UiSelect
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        </div>
        <div className="description_container_room">
          <h3>{t('common.description')}</h3>
          <p>{state.propertyRooms?.descrizione}</p>
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