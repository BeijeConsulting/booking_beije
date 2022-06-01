import React, { useState, useEffect, useRef } from "react";

// api
import { editProfileModifyPutApi } from '../../../services/api/user/userApi'

// components
import FormInput from "../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';

// modules
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { routes } from '../../../routes/routes'

// utils
import { checkPassword, checkMail } from '../../../utils/validationForm/validation'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

// style
import './profileMenuCSS/Account.scss'
import '../../../assets/variables/_common.scss'

let userEdit = {
   name: null,
   surname: null,
   email: null,
   password: null
}

const Account = (props) => {

   const { t } = useTranslation();
   const vector = useNavigate()
   const imgRef = useRef()
   const [state, setState] = useState({
      userInfo: {
         name: null,
         surname: null,
         email: null
      },
      imgChanged: false,
      passwordConfirmed: false,
      windowWidth: window.innerWidth
   });

   useEffect(() => {
      let userFromDuck = {
         name: props.userDuck?.user?.utente?.name,
         surname: props.userDuck?.user?.utente?.surname,
         email: props.userDuck?.user?.utente?.email
      }
      userEdit.name = props.userDuck?.user?.utente?.name;
      userEdit.surname = props.userDuck?.user?.utente?.surname;
      userEdit.email = props.userDuck?.user?.utente?.email
      setState({
         ...state,
         userInfo: userFromDuck
      })


   }, [props.userDuck?.user])
   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })

   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   const editProfile = () => {
      if (!state.passwordConfirmed) {
         return alert(t('toasts.formErrorConfirmPassword'))
      }

      // chiamata api 
      editProfileModifyPutApi(userEdit, getLocalStorage("token")).then((res) => {
         vector(routes.LAYOUT)
      })
   }

   // function to change name input
   const accName = (e) => {
      userEdit.name = e
   }
   // function to change surname input
   const accSurname = (e) => {
      userEdit.surname = e
   }

   // function to control mail and set mail 
   const Controllmail = (e) => {
      if (checkMail(e)) {
         userEdit.email = e;
      }
   }

   // function to check password and set it 
   const checkpass1 = (e) => {
      if (checkPassword(e)) {
         userEdit.password = e
      }
   }

   // function to check password confirm is the same to psw 
   const checkpass2 = (e) => {
      if (e !== userEdit.password) {
         setState({
            ...state,
            passwordConfirmed: false
         })
      }
      else {
         setState({
            ...state,
            passwordConfirmed: true
         })
      }
   }


   // function to set imgChanged to true 
   const selectImage = () => {
      setState({
         ...state,
         imgChanged: true
      })
   }

   return (
      <div className="bg_account">
         <div className="Account_container flex column jcSpaceB">
            <Helmet>
               <title>{t("common.account")}</title>
            </Helmet>
            {
               state.windowWidth < 991 &&
               <div><GoBackButton cssCustom="back-button" /></div>
            }
            {/* greating */}
            <div className="header_container flex jcSpaceB mx1">
               <h1>{t('fe.screens.account.hiUsername', {name: state.userInfo?.name})}</h1>
            </div>

            <div className="edit flex jcSpaceA">

               <div>
                  {/* input file  */}
                  <label className="penIcon bNone br50">
                     <FontAwesomeIcon className="pencil_icon" icon={faPencil} />
                     <input
                        ref={imgRef}
                        onChange={selectImage}
                        className="edit_image"
                        accept="image/png, image/gif, image/jpeg"
                        type="file">
                     </input>
                  </label>

                  {//if fileimg is selected
                     state.imgChanged &&
                     <div className="path_img">{imgRef.current.value}</div>
                  }

               </div>

               {/* button to edit profile !!  */}
               <div className="update_cont flex aiCenter jcCenter">
                  <button className="update cursor fwB bNone" onClick={editProfile} type="submit">{t("common.update")}</button>
               </div>
            </div>

            <form>
               {/* name */}
               <div className="i flex column my2">
                  <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("fe.screens.account.changeName")}</label>
                  <FormInput className="br2" type="text" placeholder={state.userInfo?.name} info="name" callback={accName} />
               </div>

               {/* surname  */}
               <div className="i flex column my2">
                  <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("fe.screens.account.changeSurname")}</label>
                  <FormInput className="br2" type="text" info="surname" placeholder={state.userInfo?.surname} callback={accSurname} />
               </div>

               {/* email  */}
               <div className="i flex column my2">
                  <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("fe.screens.account.changeEmail")}</label>
                  <FormInput className="br2" type="email" info="email" placeholder={state.userInfo?.email} callback={Controllmail} />
               </div>

               {/* password  */}
               <div className="i flex column my2">
                  <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("fe.screens.account.changePassword")}</label>
                  <FormInput className="br2" type="password" callback={checkpass1} info="password" placeholder={t("fe.screens.account.typePassword")} />
               </div>

               {/* password confirm  */}
               <div className="i flex column my2">
                  <label className="L" ><FontAwesomeIcon icon={faPencil} /> {t("common.passwordConfirm")}</label>
                  <FormInput className="br2" type="password" callback={checkpass2} info="confPassword" placeholder={t("fe.screens.account.typePassword")} />
               </div>

            </form>
         </div>
      </div>


   );
};

const mapStateToProps = (state) => ({
   userDuck: state.userDuck
})

export default connect(mapStateToProps)(Account)
