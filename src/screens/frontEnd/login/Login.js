import React from "react";

// modules
import { Helmet } from "react-helmet";
import { t } from "i18next";

// components
import LoginForm from "../../../components/frontEnd/hookComponents/loginForm/LoginForm";

const Login = () => {

  return (
    <>
    <Helmet>
      <title>{t("common.loginLabel")}</title>
    </Helmet>
       <LoginForm />
    </>
  );
};

export default Login