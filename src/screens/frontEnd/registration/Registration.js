import React from "react";

import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";

import FormInput from '../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput'
import FormButton from '../../../components/frontEnd/funcComponents/ui/buttons/formButton/FormButton'

const Registration = () => {

  let vector = useNavigate();

  const nav = () => {
    vector(routes.HOME);
  }
  const nav2 = () => {
    vector(routes.LOGIN);
  }
  return (
    <div className="flex column center color">

      <div className="w">LOGO</div>
      {/* <Logo></Logo> */}

      <h1 className="w">Registration</h1>
      <FormInput placeholder="Name" />
      <FormInput placeholder="Surname" />
      <FormInput placeholder="Email" />
      <FormInput placeholder="Password" />
      <FormInput placeholder="ConfirmPassword" />
      <br />
      <FormButton className="btn-primary" label="Register" callback={nav} />
      <span className="w">or</span>
      <FormButton className="btn-secondary" label="Log in" callback={nav2} />
      <br />
      <a href="#" onClick={nav}>Back to home</a>
    </div>
  );
};

export default Registration