import React from "react";

// components
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import Disclaimer from "../disclaimer/Disclaimer";
import SettingsCard from "../../../components/frontEnd/settings/cards/SettingsCard";

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
import './profileMenuCSS/Settings.less';

// utils
import { removeLocalStorage } from "../../../utils/localStorage/localStorage";
import { routes } from "../../../routes/routes";

function Settings(props) {

  const { t } = useTranslation();

  const navigate = useNavigate();

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
    path: 'messages',
    icon: faCommentAlt
  },

  {
    name: user_type === "USER" ? t("fe.screens.settings.settingsCard.becomeAHost") : t("fe.screens.settings.settingsCard.yourProperties"),
    path: 'yourProperties',
    icon: faBuilding
  }
  ]

  const createCardSettingsComponent = ((card, key) => {
    let cssClass = key === settingsToComponents.length - 1 ? 'beige posLast' : '';
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
      <div className="settings_container">
        <div>
          <div className="title_and_logout_container">
            <h1>{t("fe.screens.settings.title")}</h1>
          </div>
          <div className="settings_card_list_container">
            {settingsToComponents.map(createCardSettingsComponent)}
          </div>
        </div>
        <div className="setting_disclaimer_container">
          <UiButton
          callback={handleLogOut}
            className={"logout_button"}
            label={"Logout"} />
          <Disclaimer />
        </div>

      </div>
    </>

  );
};

export default connect()(Settings);
