import React, { useState, useEffect } from "react";

// components
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import Disclaimer from "../disclaimer/Disclaimer";
import SettingsCard from "../../../components/frontEnd/settings/cards/SettingsCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

// modules
import { useTranslation } from 'react-i18next';
import { faUser, faSuitcaseRolling, faHeart, faCommentAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

// duck
import { initUser } from "../../../redux/ducks/userDuck";
import { initToken } from "../../../redux/ducks/tokenDuck";

// style
import './profileMenuCSS/Settings.scss';
import '../../../assets/variables/_common.scss'

// utils
import { removeLocalStorage } from "../../../utils/localStorage/localStorage";
import { routes } from "../../../routes/routes";

function Settings(props) {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [state, setState] = useState({ windowWidth: window.innerWidth })

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

  const user_type = "HOST"

  const settingsToComponents = [{
    name: t("common.account"),
    path: 'account',
    icon: faUser
  },
  {
    name: t("common.bookings"),
    path: 'bookings',
    icon: faSuitcaseRolling
  },
  {
    name: t("fe.screens.settings.settingsCard.favourites"),
    path: 'favourites',
    icon: faHeart
  },
  {
    name: t("common.messages"),
    path: window.innerWidth < 991 ? 'messages' : 'chat',
    icon: faCommentAlt
  },

  {
    name: props.userDuck?.user?.auth?.length < 2 ? t("common.becomeAHost") : t("fe.screens.settings.settingsCard.yourProperties"),
    path: props.userDuck?.user?.auth?.length < 2 ? 'GOTOREGHOST' : 'GOTOMYSTRUCTURE',
    icon: faBuilding
  }
  ]

  const createCardSettingsComponent = ((card, key) => {
    let cssClass = key === settingsToComponents.length - 1 ? 'beige m0 br1 posLast' : '';
    return <SettingsCard key={key} icon={card.icon} name={card.name} path={card.path} className={cssClass} />
  })

  const handleLogOut = () => {
    props.dispatch(initUser());
    props.dispatch(initToken());
    removeLocalStorage("token")
    removeLocalStorage("refreshToken")
    navigate(routes.LAYOUT)
  }

  return (
    <>
      <Helmet>
        <title>{t("fe.screens.settings.title")}</title>

      </Helmet>
      <div className="settings_container flex column ">
        <div>
          {
            state.windowWidth < 991 &&
            <div className="back-button"><GoBackButton /></div>
          }
          <div className="cont mxAuto">
            <div className="title_and_logout_container mx3">
              <h1>{t("fe.screens.settings.title")}</h1>
            </div>
            <div className="settings_card_list_container flex jcCenter aiCenter column w100">
              {settingsToComponents.map(createCardSettingsComponent)}
            </div>
            <div className="setting_disclaimer_container flex column aiCenter">
              <UiButton
                callback={handleLogOut}
                className={"logout_button"}
                label={"Logout"} />
              <Disclaimer />
            </div>
          </div>

        </div>
      </div>
    </>

  );
};
const mapStateToProps = (state) => ({
  userDuck: state.userDuck,
})
export default connect(mapStateToProps)(Settings);
