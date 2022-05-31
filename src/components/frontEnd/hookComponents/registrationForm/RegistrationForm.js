import React from 'react';

//redux
import { setToken } from "../../../../redux/ducks/tokenDuck"

// components
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';
import CheckboxInput from '../../funcComponents/ui/input/checkboxInput/CheckboxInput';
import { notification } from 'antd';

// modules
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

// styles
import './RegistrationForm.scss';
import '../../../../assets/variables/_common.scss';
import '../../../../assets/commonStyles/toasts.scss';

// utils
import { checkMail, checkPassword } from '../../../../utils/validationForm/validation';
import { setLocalStorage } from '../../../../utils/localStorage/localStorage';

//api
import { registerUserPostApi } from '../../../../services/api/user/userApi'
import { signInPostApi } from '../../../../services/api/auth/authApi'
import { setUser } from '../../../../redux/ducks/userDuck';


let formObject = {
   name: '',
   surname: '',
   email: '',
   password: '',
   url_image: 'https://mpng.subpng.com/20180411/rzw/kisspng-user-profile-computer-icons-user-interface-mystique-5aceb0245aa097.2885333015234949483712.jpg'
   //placeholder
}

let formObjectCtrl = {
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

function RegistrationForm(props) {

   const { t } = useTranslation();

   const navigate = useNavigate();
   const handleNavigation = (routes) => () => {
      navigate(`/${routes}`)
   }

   const openNotification = (toastDescription, name, additionalCss = '') => {
      const key = `${name}-toast`;
      let cssClass = `custom-toast ${additionalCss}`;
      notification.open({
         description: toastDescription,
         onClick: () => {
            notification.close(key)
         },
         duration: 2,
         key,
         placement: 'bottom',
         className: cssClass
      });
   };

   const handleChange = (name) => (value) => {
      notification.close(`${name}-toast`);
      errors[name] = false;
      formObject = {
         ...formObject,
         [name]: value
      }
      formObjectCtrl = {
         [name]: value
      }
      value.length === 0 ? errors[name] = true : errors[name] = false;
   }

   const handleCheckbox = (name) => (value) => {
      notification.close(`${name}-toast`);
      termsAccepted = value;
      !value ? errors[name] = true : errors[name] = false;
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      notification.destroy();
      if (formObject.name.length === 0 || formObject.surname.length === 0 || formObject.email.length === 0 || formObject.password.length === 0 || formObject.confirmPassword.length === 0) {
         openNotification(t('toasts.formErrorAllFields'), 'all');
      } else {
         if (!checkMail(formObject.email)) {
            errors['email'] = true;
            openNotification(t('toasts.formErrorEmail'), 'email');
         }

         if (!checkPassword(formObject.password)) {
            errors['password'] = true;
            openNotification(t('toasts.formErrorPassword'), 'password');
         }

         if (formObject.password !== formObjectCtrl.confirmPassword) {
            errors['confirmPassword'] = true;
            openNotification(t('toasts.formErrorConfirmPassword'), 'confirmPassword');
         }

         if (!termsAccepted) {
            errors['terms'] = true;
            openNotification(t('toasts.formErrorTerms'), 'terms');
         }

         if (!Object.values(errors).includes(true)) {
            openNotification(t('toasts.formSuccess'), 'ok', 'info-toast');

            registerUserPostApi(formObject).then(signInPostApi({
               email: formObject.email,
               password: formObject.password
            })).then(res => {
               setLocalStorage("token", res.data.token);
               setLocalStorage("refreshToken", res.data.refreshToken);
               props.dispatch(setToken(res.data.token));
               props.dispatch(setUser());
            });

            navigate(routes.LAYOUT);
         }
      }

   }

   return (
      <section className="bg-color">
         <div className="container flex column px1">

            <div className="flex jcCenter aiCenter column">
               <div className="w">LOGO</div>
               {/* <Logo></Logo> */}
            </div>

            <form className=" form-container flex column myAuto">
               <h1 className="w fsXXL">{t('common.registerLabel')}</h1>
               <FormInput placeholder={t("common.name")} info="name" callback={handleChange("name")} />
               <FormInput placeholder={t("common.surname")} info="surname" callback={handleChange("surname")} />
               <FormInput placeholder={t("common.email")} info="email" callback={handleChange("email")} />
               <FormInput placeholder={t("common.password")} info="password" type="password" callback={handleChange("password")} />
               <FormInput placeholder={t("common.passwordConfirm")} info="confirmPassword" type="password" callback={handleChange("confirmPassword")} />
               <div className="terms-container">
                  <CheckboxInput name="terms" callback={handleCheckbox("terms")} className="vaM right-margin" /><span className="w">{t('fe.screens.registration.acceptTerms')}</span>
               </div>
               <div className="flex jcCenter aiCenter column">
                  <FormButton className="btn-primary m0 bNone br2" label={t("common.registerLabel")} callback={handleSubmit} />
                  <span className="w">{t('common.or')}</span>
                  <UiButton className="btn-secondary button-link bNone bgNone" label={t("common.loginLabel")} callback={handleNavigation(routes.LOGIN)} />
               </div>
            </form>

            <div className="txt">
               <a href="#" onClick={handleNavigation(routes.HOME)}>{t('common.backToHome')}</a>
            </div>

         </div>
      </section>
   )
}

export default connect()(RegistrationForm);