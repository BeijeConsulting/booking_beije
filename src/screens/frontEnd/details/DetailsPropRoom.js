import React, { useEffect, useState } from "react";

// modules
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import UiSelect from "../../../components/frontEnd/funcComponents/ui/uiSelect/UiSelect"
import { annuncioDetailGetApi } from "../../../services/api/annuncio/annuncioApi";
import applicationStore from "../../../applicationStore";

const DetailsPropRoom = () => {

  const { t } = useTranslation();

  const [state, setState] = useState({
    propertyRooms: null
  })

  useEffect(() => {
    annuncioDetailGetApi(14).then(res => {
      console.log('1', res.data);
      setState({
        property: res.data
      })
    });
  }, [])

  return (
    <>
      <Helmet>
        <title>{t("fe.screens.propertyDetails.roomDetails")}</title>
      </Helmet>
      <div className="property_room_container">
        <h2>{state.property?.titolo}</h2>
        <div className="price_checkout_in_date">
          <span>{`${state.property?.prezzo}/${t('fe.components.rooms.night')}`}</span>
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
          <p>{state.property?.descrizione}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsPropRoom