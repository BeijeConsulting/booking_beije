import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { Outlet } from "react-router-dom";
// import Logo from '../../../components/frontEnd/funcComponents/logo/Logo'
import FormInput from '../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput'
import FormButton from '../../../components/frontEnd/funcComponents/ui/buttons/formButton/FormButton'
import './Login.less'

const Login = () => {

  let vector = useNavigate();

  const nav = () => {
    vector(routes.HOME);
  }
  const nav2 = () => {
    vector(routes.REGISTRATION);
  }
  const nav3 = () => {
    vector(routes.SETTINGS);

  }
  // const nav4 = () => {
  //   vector(routes.SETTINGS)

  //  }

  return (
    <div className=" container color flex column space">
      <div className="flex center column">
        <div className="w">LOGO</div>
        {/* <Logo></Logo> */}

      </div>
      <div>
        <h1 className="w">Login</h1>
        <div className="formInput flex center column">
          <FormInput placeholder="Email" />
          <FormInput placeholder="Password" />
          <br />
          <FormButton className="btn-primary" label="Log in" callback={nav} />
          <span className="w">or</span>
          <FormButton className="btn-secondary" label="Register" callback={nav2} />
        </div>
      </div>
      <div className="txt">
        <a href="#" onClick={nav}>Back to home</a>
      </div>
      {/* <button onClick={nav}>Bookings</button>
      <button onClick={nav2}>messages</button>
      <button onClick={nav3}>conversation</button>
      <button onClick={nav4}>settings</button> */}
      <Outlet></Outlet>
    </div>
  );
};

export default Login