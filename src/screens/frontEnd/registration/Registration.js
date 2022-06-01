import React from "react";

// components
import RegistrationForm from '../../../components/frontEnd/hookComponents/registrationForm/RegistrationForm';

// modules
import { Helmet } from "react-helmet";
import { t } from "i18next";

// style
import './Registration.scss';

const Registration = () => {
   return (
      <>
         <Helmet>
            <title>{t("common.registration")}</title>
         </Helmet>
         <RegistrationForm />
      </>
   );
};

export default Registration;