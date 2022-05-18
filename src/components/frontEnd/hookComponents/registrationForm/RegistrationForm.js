import React from 'react';
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';
import CheckboxInput from '../../funcComponents/ui/input/checkboxInput/CheckboxInput';

import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

import { checkMail, checkPassword } from '../../../../utils/validationForm/validation';

import './RegistrationForm.less';


let formObject = {
   name: '',
   surname: '',
   email: '',
   password: '',
   confirmPassword: ''
}

let termsAccepted = false;

function RegistrationForm() {

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(routes)
   }

   const handleChange = (name) => (value) => {
      formObject = {
         ...formObject,
         [name]: value
      }
   }

   const handleCheckbox = (value) => {
      termsAccepted = value;
      console.log(termsAccepted);

   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if (formObject.name.length === 0 || formObject.surname.length === 0 || formObject.email.length === 0 || formObject.password.length === 0 || formObject.confirmPassword.length === 0) {
         // error toast
         console.log('all fields must be filled in');
      } else {
         if (!checkMail(formObject.email)) {
            // error toast
            console.log('email not valid');
         }

         if (!checkPassword(formObject.password)) {
            // error toast
            console.log('password', formObject.password);
            console.log('password not valid: at least 8 character long with 1 special character');
         }

         if (formObject.password !== formObject.confirmPassword) {
            // error toast
            console.log('passwords do not match');
         }

         if (!termsAccepted) {
            // error toast
            console.log('you have to accept the terms and conditions');
         }
      }

      delete formObject.confirmPassword;
      // const response = postApi('user', formObject);
      // console.log(response);

      // set token in localStorage
      // redux

      // if all checks ok
      // navigate(routes.HOME);
   }

   return (
      <section className="container color flex column space txt">

         <div className="flex center column">
            <div className="w">LOGO</div>
         </div>

         <form>
            <h1 className="w">Registration</h1>
            <div className="formInput autoWidth flex center column">
               <FormInput placeholder="Name" info="name" callback={handleChange("name")} />
               <FormInput placeholder="Surname" info="surname" callback={handleChange("surname")} />
               <FormInput placeholder="Email" info="email" callback={handleChange("email")} />
               <FormInput placeholder="Password" info="password" callback={handleChange("password")} />
               <FormInput placeholder="ConfirmPassword" info="confirmPassword" callback={handleChange("confirmPassword")} />
               <br />
               <FormButton className="btn-primary" label="Register" callback={handleSubmit} />
               <span className="w">or</span>
               <UiButton className="btn-secondary" label="Log in" callback={handleNavigation(routes.LOGIN)} />
            </div>
            <div>
               <CheckboxInput name="terms" callback={handleCheckbox} /><span className="w">Accetta i termini di condizione </span>
            </div>
         </form>

         <div className="txt w">
            <a href="#" onClick={handleNavigation(routes.HOME)}>Back to home</a>
         </div>

      </section>
   )
}

export default RegistrationForm;