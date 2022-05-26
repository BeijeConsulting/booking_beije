import React, { useState, useEffect } from "react";
//icon
import { t } from "i18next";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { checkPassword, checkMail } from '../../../utils/validationForm/validation'
// import { editProfileModifyPutApi } from '../../../services/api/user/userApi'
// import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import { connect } from "react-redux";
//css
import './profileMenuCSS/Account.scss'
import '../../../assets/variables/_common.scss'

import FormInput from "../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";

let uName
let uSurname
let mail
let psw

const Account = (props) => {

  const [state, setState] = useState({
    id: null,
    name: null,
    surname: null,
    email: null,
    password: null,
    user: [],
    windowWidth: window.innerWidth
  });


  let objToValue = {
    id: 1,
    name: "Mario",
    surname: "Rossi",
    email: "pp@gmail.com",
    password: "password"
  }
  /* useEffect(() => {
    objToValue =  props.userDuck;*/
  // editProfileModifyPutApi(state.id, getLocalStorage("token"))
  // .then(res=>{
  //   setState({
  //     ...state,
  //     user:res?.data
  //   })
  // })

  /*}, []) */


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
    // console.log("cambiate credenziali");
    let credentialToChange = [1, "name", "surname", "email", "password"];

    for (let index = 0; index < 5; index++) {

      if (state[credentialToChange[index]] !== null || '') {
        objToValue[credentialToChange[index]] = state[credentialToChange[index]]
      }
    }
    console.log(objToValue);
    objToValue.name = uName
    objToValue.surname = uSurname
    objToValue.email = mail
    objToValue.password = psw
  }

  const accName = (e) => {
    console.log("e", e);
    uName = e.target.value

  }
  const accSurname = (e) => {
    console.log("e", e);
    uSurname = e.target.value

  }

  const Controllmail = (e) => {
    mail = e.target.value
    checkMail(mail)
    console.log(checkMail(mail), mail);
  }

  const checkpass1 = (e) => {
    psw = e.target.value
    checkPassword(psw)
    console.log(checkPassword(psw), psw);

  }

  const checkpass2 = (e) => {
    console.log(e.target.value);
    if (e.target.value !== psw)
      console.log("error");
    else {
      console.log("va bene");
    }
  }

  return (
    <div className="Account_container flex column jcSpaceB h85">
      <Helmet>
        <title>{t("common.account")}</title>
      </Helmet>
      {
        state.windowWidth < 991 &&
        <div className="back-button"><GoBackButton /></div>
      }
      <div className="header_container flex jcSpaceB mx1">
        <h1>Ciao, {objToValue.name}!</h1>
        <div>
          <button className="acc_logout bNone">{t("common.logout")}</button>
        </div>
      </div>

      <div className="edit flex jcSpaceA">
        <div>
          <button className="penIcon bNone br50"><FontAwesomeIcon icon={faPencil} /></button>
        </div>
        <div className="update_cont flex aiCenter jcCenter">
          <button className="update cursor fwB bNone" onClick={editProfile} type="submit">{t("common.update")}</button>
        </div>
      </div>

      <form>
        <div className="i flex column m1">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.name")}</label>
          {/*<input type="text" onChange={accName} id="name" />*/}
          <FormInput className="br3" type="text" placeholder={objToValue.name} info="name" callback={accName} />
        </div>

        <div className="i flex column m1">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.surname")}</label>
          {/* <input type="text" id="surname" /> */}
          <FormInput className="br3" type="text" info="surname" placeholder={objToValue.surname} callback={accSurname} />
        </div>

        <div className="i flex column m1">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.email")}</label>
          {/* <input type="email" id="email" /> */}
          <FormInput className="br3" type="email" info="email" placeholder={objToValue.email} callback={Controllmail} />
        </div>

        <div className="i flex column m1">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.password")}</label>
          <input className="br3" type="password" id="password" onChange={checkpass1} />
          {/* <FormInput className="br3" type="password" onChange={checkpass1} info="password" /> */}
        </div>

        <div className="i flex column m1">
          <label className="L" ><FontAwesomeIcon icon={faPencil} /> {t("common.passwordConfirm")}</label>
          <input className="br3" type="password" id="confirmPassword" onChange={checkpass2} />
          {/* <FormInput className="br3" type="password" onChange={checkpass2}  info="confPassword"/> */}
        </div>

      </form>
    </div>

  );
};

const mapStateToProps = (state) => ({
  userDuck: state.userDuck
})

export default connect(mapStateToProps)(Account)
