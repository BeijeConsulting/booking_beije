import React, { useState } from "react";
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
import './profileMenuCSS/Account.less'
import FormInput from "../../../components/frontEnd/funcComponents/ui/input/formInput/FormInput";

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
    user: []
  });


  let objToValue = {
    id: 1,
    name: "paolo",
    surname: "Pascucci",
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
    <div className="Account_container">
      <Helmet>
        <title>{t("common.account")}</title>
      </Helmet>

      <div className="header_container">
        <h1>Ciao, {objToValue.name}!</h1>
        <div>
          <button className="acc_logout">{t("common.logout")}</button>
        </div>
      </div>

      <div className="edit">
        <div>
          <button className="penIcon"><FontAwesomeIcon icon={faPencil} /></button>
        </div>
        <div className="update_cont">
          <button className="update" onClick={editProfile} type="submit">{t("common.update")}</button>
        </div>
      </div>

      <form>
        <div className="i">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.name")}</label>
          {/*<input type="text" onChange={accName} id="name" />*/}
          <FormInput type="text" placeholder={objToValue.name} info="name" callback={accName} />
        </div>

        <div className="i">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.surname")}</label>
          {/* <input type="text" id="surname" /> */}
          <FormInput type="text" info="surname" placeholder={objToValue.surname} callback={accSurname} />
        </div>

        <div className="i">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.email")}</label>
          {/* <input type="email" id="email" /> */}
          <FormInput type="email" info="email" placeholder={objToValue.email} callback={Controllmail} />
        </div>

        <div className="i">
          <label className="L"><FontAwesomeIcon icon={faPencil} /> {t("common.change")} {t("common.password")}</label>
          <input type="password" id="password" onChange={checkpass1} />
          {/* <FormInput type="password" onChange={checkpass1} info="password" /> */}
        </div>

        <div className="i">
          <label className="L" ><FontAwesomeIcon icon={faPencil} /> {t("common.passwordConfirm")}</label>
          <input type="password" id="confirmPassword" onChange={checkpass2} />
          {/* <FormInput type="password" onChange={checkpass2}  info="confPassword"/> */}
        </div>

      </form>
    </div>

  );
};

const mapStateToProps = (state) => ({
  userDuck: state.userDuck
})

export default connect(mapStateToProps)(Account)
