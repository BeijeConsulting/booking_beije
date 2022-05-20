import React, { useEffect, useState } from "react";

// modules
import { t } from "i18next";
import { Helmet } from "react-helmet";

//function
import { periodiPrenotatiGetApi } from "../../../services/api/periodoPrenotatoApi/periodoApi";
import { CurrentDate } from "../../../utils/date/date";
//ui
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";

let arrayBkp = [];

const Bookings = () => {

  const [state, setState] = useState({
    PeriodListStructure: [],
  })

  const dateCurrent = CurrentDate();

  useEffect(() => {
    periodiPrenotatiGetApi('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNvbGFmYXN1bGxpQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiJdLCJpYXQiOjE2NTMwNjI3MTMsImV4cCI6MTY1MzA2NjMxM30.hjJ0954uINQJ37Iv9zX3abG_RhTDoUFsb3UIeBxH8_M').then(res => {
      arrayBkp = res.data
      setState({
        PeriodListStructure: arrayBkp.filter((item) => {
          return item.statoAccettazione == "ACCETTATO" && item.data_fine < dateCurrent;
        })
      })
    })
    console.log(arrayBkp);
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

export default Bookings
