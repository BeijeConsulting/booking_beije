import React from 'react';
// import Logo from '../../../components/frontEnd/funcComponents/logo/Logo'
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';

import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';



let formObject = {
   email: '',
   password: ''
}

function LoginForm() {

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(routes)
   }

   const handleChange = (name) => (value) => {
      formObject = {
         ...formObject,
         [name]: value
      }
      console.log(formObject);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      // const response = postApi('signin', formObject);
      // console.log(response);
      // set token in localStorage
      // redux
      navigate(routes.HOME);
   }

   return (
      <section className="container color flex column space">

         <div className="flex center column">
            <div className="w">LOGO</div>
            {/* <Logo></Logo> */}
         </div>

         <form>
            <div className="formInput flex center column">
            <h1 className="w">Login</h1>
               <FormInput type={'text'} placeholder="Email" info="email" callback={handleChange('email')} />
               <FormInput type={'password'} placeholder="Password" info="password" callback={handleChange('password')} />
               <br />
               <FormButton className="btn-primary" label="Log in" callback={handleSubmit} />
               <span className="w">or</span>
               <UiButton className="btn-secondary" label="Register" callback={handleNavigation(routes.REGISTRATION)} />
            </div>
         </form>

         <div className="txt">
            <a href="#" onClick={handleNavigation(routes.HOME)}>Back to home</a>
         </div>

      </section>
   )
}

export default LoginForm;