import React, { useState, useEffect, useRef } from "react";
//icon
import { t } from "i18next";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { checkPassword, checkMail } from '../../../utils/validationForm/validation'
import { editProfileModifyPutApi } from '../../../services/api/user/userApi'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import { connect } from "react-redux";
//css
import './profileMenuCSS/Account.scss'
import '../../../assets/variables/_common.scss'

import FormInput from "../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";


let userEdit = {
  uName: null,
  uSurname: null,
  email: null,
  psw: null
}

const Account = (props) => {
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
    userEdit = userFromDuck;
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
      return alert('le password non coincidono')
    }
    var bodyFormData = new FormData();
    bodyFormData.append('name', userEdit.uName);
    bodyFormData.append('surname', userEdit.uSurname);
    bodyFormData.append('email', userEdit.email);
    bodyFormData.append('url_image', imgRef.current.value);


    // chiamata api 
    editProfileModifyPutApi(bodyFormData, getLocalStorage("token")).then((res) => {
      console.log(res)
    })
  }

  // function to change name input
  const accName = (e) => {
    userEdit.uName = e
  }
  // function to change surname input
  const accSurname = (e) => {
    userEdit.uSurname = e
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
      console.log(e)
      userEdit.psw = e
    } else {
      console.log('password errata')
    }
  }

  // function to check password confirm is the same to psw 
  const checkpass2 = (e) => {
    if (e !== userEdit.psw) {
      console.log('password diversa')
      setState({
        ...state,
        passwordConfirmed: false
      })
    }
    else {
      console.log('stessa psw')
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
          <h1>Ciao, {state.userInfo?.name}!</h1>
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
            <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.name")}</label>
            <FormInput className="br2" type="text" placeholder={state.userInfo?.name} info="name" callback={accName} />
          </div>

          {/* surname  */}
          <div className="i flex column my2">
            <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.surname")}</label>
            <FormInput className="br2" type="text" info="surname" placeholder={state.userInfo?.surname} callback={accSurname} />
          </div>

          {/* email  */}
          <div className="i flex column my2">
            <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.email")}</label>
            <FormInput className="br2" type="email" info="email" placeholder={state.userInfo?.email} callback={Controllmail} />
          </div>

          {/* password  */}
          <div className="i flex column my2">
            <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.password")}</label>
            <FormInput className="br2" type="password" callback={checkpass1} info="password" />
          </div>

          {/* password confirm  */}
          <div className="i flex column my2">
            <label className="L" ><FontAwesomeIcon icon={faPencil} /> {t("common.passwordConfirm")}</label>
            <FormInput className="br2" type="password" callback={checkpass2} info="confPassword" />
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
