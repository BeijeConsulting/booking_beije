import React, { useState } from 'react';
import { connect } from 'react-redux';

// import Logo from '../../../components/frontEnd/funcComponents/logo/Logo'
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';

//redux
import { setToken } from "../../../../redux/ducks/tokenDuck"

import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

//import {postApi} from '../../../../services/genericServices';
import './LoginForm.less'
import { useTranslation } from 'react-i18next';

//api
import { signInPostApi } from '../../../../services/api/auth/authApi'

//localstorage
import { setLocalStorage } from '../../../../utils/localStorage/localStorage';
import { setUser } from '../../../../redux/ducks/userDuck';
import { checkMail, checkPassword } from '../../../../utils/validationForm/validation';
import { notification } from 'antd';


let formObject = {
   email: '',
   password: ''
}

let errors = {
   email: false,
   password: false
}

function LoginForm(props) {

   const [state, setState] = useState({
      isDisable: true
   })

   const { t } = useTranslation();

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(`${routes}`)
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
      formObject = {
         ...formObject,
         [name]: value
      }

      if (formObject.email.length === 0 || formObject.password.length === 0) {
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
      }


      if (checkPassword(formObject.password) && checkMail(formObject.email))
         setState({
            ...state,
            isDisable: false
         })
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      notification.destroy();

      if (!Object.values(errors).includes(true)) {
         openNotification(t('toasts.formSuccess'), 'ok', 'info-toast');

         signInPostApi(formObject).then(res => {
            setLocalStorage("token", res.data.token);
            setLocalStorage("refreshToken", res.data.refreshToken);
            props.dispatch(setToken(res.data.token));
            props.dispatch(setUser())
            navigate(routes.LAYOUT);
         }).catch((error) => {
            if (error.status === 401) {
               openNotification(t('toasts.formErrorApi'), 'info-toast');
               // navigate(routes.LOGIN);

            }
         })
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
               <h1 className="w title">{t('common.loginLabel')}</h1>
               <FormInput type={'text'} placeholder={t("common.email")} info="email" callback={handleChange('email')} />
               <FormInput type={'password'} placeholder={t("common.password")} info="password" callback={handleChange('password')} />
               <div className="flex center column">
                  <FormButton className="btn-primary" label={t("common.loginLabel")} callback={handleSubmit} disabled={state.isDisable} />
                  <span className="w">{t('common.or')}</span>
                  <UiButton className="btn-secondary button-link" label={t("common.registerLabel")} callback={handleNavigation(routes.REGISTRATION)} />
               </div>
            </form>

            <div className="txt">
               <a href="#" onClick={handleNavigation(routes.LAYOUT)}>{t('common.backToHome')}</a>
            </div>

         </div>
      </section>
   )
}

export default connect()(LoginForm);