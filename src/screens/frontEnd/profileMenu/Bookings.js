import React, { useEffect, useState } from "react";

// modules
import { t } from "i18next";
import { Helmet } from "react-helmet";

//function
import { CurrentDate } from "../../../utils/date/date";
//ui
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";

//api
import { periodiPrenotatiUserGetApi } from '../../../services/api/periodoPrenotatoApi/periodoApi'

//redux
import { connect } from 'react-redux';

let arrayBkp = [];

const Bookings = (props) => {

  const [state, setState] = useState({
    PeriodListStructure: [],
  })

  const dateCurrent = CurrentDate();

  useEffect(() => {
    periodiPrenotatiUserGetApi(props.tokenDuck?.token).then(res => {
      arrayBkp = res.data.length > 0 ? res.data : [];
      setState({
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

  return (
    <div className="bookings_container">
      <Helmet>
        <title>{t("fe.screens.settings.settingsCard.bookings")}</title>
      </Helmet>
      <h1>{t("fe.screens.settings.settingsCard.bookings")}</h1>
      <div className="button_switch_container">
        {buttonType.map(popolateSwitchButton)}
      </div>
      <div className="apartment_container">
        {state.PeriodListStructure.length <= 0 ? <p>Non ci sono appartamenti da mostrare</p> : state.PeriodListStructure.map((item, key) => {
          return <p key={key}>{item.annuncio.titolo}</p>
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userDuck: state.userDuck,
  tokenDuck: state.tokenDuck
});

export default connect(mapStateToProps)(Bookings)
