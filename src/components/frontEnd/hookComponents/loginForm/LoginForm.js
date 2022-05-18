import React from 'react';
// import Logo from '../../../components/frontEnd/funcComponents/logo/Logo'
import FormInput from '../../funcComponents/ui/input/formInput/FormInput';
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import UiButton from '../../funcComponents/ui/buttons/uiButtons/UiButton';

import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';

//import {postApi} from '../../../../services/genericServices';
import './LoginForm.less'
import { useTranslation } from 'react-i18next';


let formObject = {
   email: '',
   password: ''
}

function LoginForm() {

   const { t } = useTranslation();

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
            <div className="w logo">LOGO</div>
            {/* <Logo></Logo> */}
         </div>

         <form>
            <h1 className="w title">{t('common.loginLabel')}</h1>
            <div className="formInput flex center column">
               <h1 className="w">{t('common.loginLabel')}</h1>
               <FormInput className='formInput' type={'text'} placeholder={t("common.email")} info="email" callback={handleChange('email')} />
               <FormInput className='formInput' type={'password'} placeholder={t("common.password")} info="password" callback={handleChange('password')} />
               <br />
               <FormButton className="btn-primary" label={t("common.loginLabel")} callback={handleSubmit} />
               <span className="w">{t('common.or')}</span>
               <UiButton className="btn-secondary" label={t("common.registerLabel")} callback={handleNavigation(routes.REGISTRATION)} />
            </div>
         </form>

         <div className="txt">
            <a href="#" onClick={handleNavigation(routes.HOME)}>{t('common.backToHome')}</a>
         </div>

      </section>
   )
}

export default LoginForm;