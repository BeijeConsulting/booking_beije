import React from 'react';

// components
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';
import CheckboxInput from '../../funcComponents/ui/input/checkboxInput/CheckboxInput';

// modules
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
import { useTranslation } from 'react-i18next';

// styles
import './RegistrationForm.less';

// utils
import { checkMail, checkPassword } from '../../../../utils/validationForm/validation';


let formObject = {
   name: '',
   surname: '',
   email: '',
   password: '',
   confirmPassword: '',
   terms: false
}

let errors = {
   name: false,
   surname: false,
   email: false,
   password: false,
   confirmPassword: false,
   terms: false
}

let termsAccepted = false;

function RegistrationForm() {

   const { t } = useTranslation();

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(`/${routes}`)
   }

   const handleChange = (name) => (value) => {
      errors[name] = false;
      formObject = {
         ...formObject,
         [name]: value
      }
      value.length === 0 ? errors[name] = true : errors[name] = false;
   }

   const handleCheckbox = (name) => (value) => {
      termsAccepted = value;
      !value ? errors[name] = true : errors[name] = false;
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if (formObject.name.length === 0 || formObject.surname.length === 0 || formObject.email.length === 0 || formObject.password.length === 0 || formObject.confirmPassword.length === 0) {
         // error toast
         console.log('all fields must be filled in');
      } else {
         if (!checkMail(formObject.email)) {
            errors['email'] = true;
            // error toast
            console.log('email not valid');
         }

         if (!checkPassword(formObject.password)) {
            errors['password'] = true;
            // error toast
            console.log('password not valid: at least 8 character long with 1 special character');
         }

         if (formObject.password !== formObject.confirmPassword) {
            errors['confirmPassword'] = true;
            // error toast
            console.log('passwords do not match');
         }

         if (!termsAccepted) {
            errors['terms'] = true;
            // error toast
            console.log('you have to accept the terms and conditions');
         }

         if (!Object.values(errors).includes(true)) {
            console.log('everything ok');

            // delete formObject.confirmPassword;
            // const response = postApi('user', formObject);
            // console.log(response);

            // set token in localStorage
            // redux

            // navigate(routes.HOME);
         }
         console.log('errors', errors);
      }

   }

   return (
      <section className="bg-color">
         <div className="form-container container flex column space">

            <div className="flex center column">
               <div className="w">LOGO</div>
               {/* <Logo></Logo> */}
            </div>

            <form className="flex column">
               <h1 className="w title">{t('common.registerLabel')}</h1>
               <FormInput placeholder={t("common.name")} info="name" callback={handleChange("name")} />
               <FormInput placeholder={t("common.surname")} info="surname" callback={handleChange("surname")} />
               <FormInput placeholder={t("common.email")} info="email" callback={handleChange("email")} />
               <FormInput placeholder={t("common.password")} info="password" type="password" callback={handleChange("password")} />
               <FormInput placeholder={t("common.passwordConfirm")} info="confirmPassword" type="password" callback={handleChange("confirmPassword")} />
               <div className="terms-container">
                  <CheckboxInput name="terms" callback={handleCheckbox("terms")} className="bottom right-margin" /><span className="w">{t('fe.screens.registration.acceptTerms')}</span>
               </div>
               <div className="flex center column">
                  <FormButton className="btn-primary" label={t("common.registerLabel")} callback={handleSubmit} />
                  <span className="w">{t('common.or')}</span>
                  <UiButton className="btn-secondary button-link" label={t("common.loginLabel")} callback={handleNavigation(routes.LOGIN)} />
               </div>
            </form>

            <div className="txt">
               <a href="#" onClick={handleNavigation(routes.HOME)}>{t('common.backToHome')}</a>
            </div>

         </div>
      </section>
   )
}

export default RegistrationForm;