import React from "react";
import UiButton from "../../../components/frontEnd/funcComponents/ui/buttons/uiButtons/UiButton";
import Disclaimer from "../disclaimer/Disclaimer";
import SettingsCard from "../../../components/frontEnd/settings/cards/SettingsCard";


import { useTranslation } from 'react-i18next';
import { faUser, faSuitcaseRolling, faHeart, faCommentAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';


import './profileMenuCSS/Settings.less'
import { Helmet } from "react-helmet";

function Settings() {

  const { t } = useTranslation();

  const user_type = "HOST"

  const settingsToComponents = [{
    name: t("fe.screens.settings.settingsCard.account"),
    path: 'account',
    icon: faUser
  },
  {
    name: t("fe.screens.settings.settingsCard.bookings"),
    path: 'bookings',
    icon: faSuitcaseRolling
  },
  {
    name: t("fe.screens.settings.settingsCard.favourites"),
    path: 'favourites',
    icon: faHeart
  },
  {
    name: t("fe.screens.settings.settingsCard.messages"),
    path: 'messages',
    icon: faCommentAlt
  },
  {
    name: user_type === "USER" ? t("fe.screens.setting.settingsCard.becomeAHost") : t("fe.screens.settings.settingsCard.yourProperties"),
    path: 'yourProperties',
    icon: faBuilding
  }
  ]

  const createCardSettingsComponent = ((card, key) => {
    let cssClass = key === settingsToComponents.length - 1 ? 'beige posLast' : '';
    return <SettingsCard key={key} icon={card.icon} name={card.name} path={card.path} className={cssClass} />
  })

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
            className={"logout_button"}
            label={"Logout"} />
          <Disclaimer />
        </div>

      </div>
    </>

  );
};

export default Settings
