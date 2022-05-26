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
import './LoginForm.scss'
import '../../../../assets/variables/_common.scss';
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

      if (!checkMail(formObject.email)) {
         errors['email'] = true;
         openNotification(t('toasts.formErrorEmail'), 'email');
      }

    


      value.length === 0 ? errors[name] = true : errors[name] = false;

      if (checkMail(formObject.email))
      setState({
         ...state,
         isDisable: false
      })
   }

   const response = res => {
      openNotification(t('toasts.formSuccess'), 'ok', 'info-toast');
      setLocalStorage("token", res.data.token);
      setLocalStorage("refreshToken", res.data.refreshToken);
      props.dispatch(setToken(res.data.token));
      props.dispatch(setUser())
      navigate(routes.LAYOUT);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      notification.destroy();

      if (!Object.values(errors).includes(true)) {

         signInPostApi(formObject).then(response).catch((error) => {
            if (error?.response?.status === 401) {
               openNotification(t('toasts.formErrorApi'), 'info-toast');
            }
         })
      }  
   }

   return (
      <section className="bg-color">
         <div className="form-container container flex column jcSpaceA">

            <div className="flex jcCenter aiCenter column">
               <div className="w">LOGO</div>
               {/* <Logo></Logo> */}
            </div>

            <form className="flex column">
               <h1 className="w fsXXL">{t('common.loginLabel')}</h1>
               <FormInput type={'text'} placeholder={t("common.email")} info="email" callback={handleChange('email')} />
               <FormInput type={'password'} placeholder={t("common.password")} info="password" callback={handleChange('password')} />
               <div className="flex jcCenter aiCenter column">
                  <FormButton className="btn-primary" label={t("common.loginLabel")} callback={handleSubmit} disabled={state.isDisable} />
                  <span className="w">{t('common.or')}</span>
                  <UiButton className="btn-secondary bNone bgNone button-link" label={t("common.registerLabel")} callback={handleNavigation(routes.REGISTRATION)} />
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