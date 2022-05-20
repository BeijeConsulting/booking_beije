import React from 'react';
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
import { setLocalStorage, getLocalStorage } from '../../../../utils/localStorage/localStorage';
import { setUser } from '../../../../redux/ducks/userDuck';


let formObject = {
   email: '',
   password: ''
}

function LoginForm(props) {

   const { t } = useTranslation();

   const navigate = useNavigate();

   const handleNavigation = (routes) => () => {
      navigate(`${routes}`)
   }

   const handleChange = (name) => (value) => {
      formObject = {
         ...formObject,
         [name]: value
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      signInPostApi(formObject).then(res => {
         setLocalStorage("token", res.data.token);
         setLocalStorage("refreshToken", res.data.refreshToken);
         props.dispatch(setToken(res.data.token));
      });
      console.log(getLocalStorage('token'));
      props.dispatch(setUser())
      navigate(routes.LAYOUT);
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
                  <FormButton className="btn-primary" label={t("common.loginLabel")} callback={handleSubmit} />
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