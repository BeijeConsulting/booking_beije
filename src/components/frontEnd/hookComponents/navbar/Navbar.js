import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// translation 
import { useTranslation } from 'react-i18next';

// scss 
import './Navbar.scss';
import '../../../../assets/variables/_common.scss';

import LanguagesSwitch from "../../../common/languagesSwitch/LanguagesSwitch";
import Logo from '../../funcComponents/logo/Logo';

// profile image 
import LoggedUser from '../../../../assets/images/LoggedUser.png';
import notLoggedUser from '../../../../assets/images/notLoggedUser.png';


// connect to redux 
import { connect } from "react-redux";

// duck
import { initUser } from "../../../../redux/ducks/userDuck";
import { initToken } from "../../../../redux/ducks/tokenDuck";

// routes 
import { routes } from "../../../../routes/routes";
// modale 
import Modal from '../../../common/modal/Modal'

// fontawesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

// search component 

// proptypes 
import PropTypes from "prop-types";

// utils localstorage 
import { getLocalStorage } from '../../../../utils/localStorage/localStorage';
import useLogout from "../../../../hooks/useLogout";
import { Link } from "react-router-dom";
import SearchForm from "../../classComponents/pageComponents/modalChildrenComponent/searchForm/SearchForm";
import SearchResult from "../../classComponents/pageComponents/searchResult/SearchResult";


function Navbar(props) {
   let vector = useNavigate();
   const { t } = useTranslation();
   const { logoutUser } = useLogout();
   // const logout = useLogout();

   const [state, setState] = useState({
      isMenuOpen: false,
      modalSearchIsOpen: false,
      isLogIn: false
   })

   useEffect(isLogIn, [getLocalStorage('token')])

   function isLogIn() {
      let newState = Object.assign({}, state)
      if (getLocalStorage('token')) {
         newState = {
            ...newState,
            isLogIn: true
         }
      } else {
         newState = {
            ...newState,
            isLogIn: false
         }
      }
      setState(newState)
   }

   // function to set modal search open true 
   const openModalSearch = () => {
      setState({
         ...state,
         modalSearchIsOpen: true
      })
   }

   // function to set modal search open false 
   const closeModalSearch = () => {
      setState({
         ...state,
         modalSearchIsOpen: false
      })
   }
   // function to Go to dimanic vector 
   const goTo = (params) => () => {
      let obj = { ...state }

      if (params !== 'HOME') {
         obj.isMenuOpen = !obj.isMenuOpen
      }
      setState(obj)

      vector(routes[params])
   }

   // function to Open Menu 
   const handleNavMenu = () => {
      setState({
         ...state,
         isMenuOpen: !state.isMenuOpen
      })
   }
   // function to logout 
   const logoutFunc = () => {
      setState({
         ...state,
         isMenuOpen: false
      })

      logoutUser();
      props.dispatch(initUser());
      props.dispatch(initToken());
      vector(routes.LAYOUT);
      // logout.logoutUser();
   }
   return (
      <>

         {
            //MOBILE
            props.stateLayout < 480 ?
               <nav className="navMobile fixed b0 w100 flex jcSpaceA aiCenter">
                  <FontAwesomeIcon className="iconSearch" onClick={goTo('SEARCH')} icon={faSearch} />

                  <Logo callback={goTo('HOME')} />

                  {
                     state.isLogIn ?
                        <img className="iconIfLogged ofC brr50" onClick={goTo('SETTINGS')} src={LoggedUser} alt=""></img> :
                        <img className="iconNotLogged ofC br50" onClick={goTo('LOGIN')} src={notLoggedUser} alt="user"></img>
                  }
               </nav>
               //DESKTOP
               : <>
                  <nav className="navDesktop t0 w100 flex jcSpaceB aiCenter relative">

                     <Logo callback={goTo('HOME')} />

                     {
                        state.isLogIn ?


                           <>{
                              state.isMenuOpen === false ?
                                 <div className="flex">
                                    <LanguagesSwitch />

                                    < div className="hambMenu flex br2 cursor mL1 aiCenter" >
                                       <FontAwesomeIcon className="arrowMenu" icon={faChevronLeft} onClick={handleNavMenu} />
                                       {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" /> */}
                                       <img className="phUser ofC br50" src={LoggedUser} alt="profileUser" />
                                    </div>
                                 </div>

                                 :
                                 <div className="flex">
                                    <LanguagesSwitch />

                                    <div className="hambMenu flex br2 cursor mL1 aiCenter">
                                       <FontAwesomeIcon className="arrowMenuOpen" icon={faChevronLeft} onClick={handleNavMenu} />
                                       {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" /> */}
                                       <img className="phUser ofC br50" src={LoggedUser} alt="profileUser" />
                                    </div>
                                 </div>


                           }
                           </>
                           :
                           <div className="flex">
                              <LanguagesSwitch />
                              <span className="go_to_login cursor mL1" onClick={goTo('LOGIN')}>Login</span>
                           </div>
                     }
                  </nav>
                  {
                     state.isMenuOpen &&
                     <ul className={props.cssCustomMenu}>
                        <li onClick={goTo('SETTINGS')}>{t('common.account')}</li>
                        <li onClick={goTo('BOOKINGS')}>{t('common.bookings')}</li>
                        <li onClick={goTo('FAVOURITES')}>{t('fe.screens.settings.settingsCard.favourites')}</li>
                        <li onClick={goTo(props.stateLayout > 991 ? 'CHAT' : 'MESSAGES')}>{t('common.messages')}</li>
                        {
                           props.userDuck?.user?.auth?.length < 2 ?
                              <li>
                                 <Link className="link_navbar" to={`${routes.DASHBOARD}/${routes.HOST_REGISTRATION}`} >
                                    {t('common.becomeAHost')}
                                 </Link>
                              </li> :
                              <li>
                                 <Link className="link_navbar" to={`${routes.DASHBOARD}`} >
                                    {t('fe.screens.settings.settingsCard.yourProperties')}
                                 </Link>
                              </li>


                        }
                        <li onClick={logoutFunc}>Logout</li>
                     </ul>
                  }

               </>
         }
      </>

   )
}

Navbar.defaultProps = {
   cssCustomMenu: 'settingOpen w100 flex wrap jcSpaceB aiCenter absolute'
}

// propTypes 
Navbar.propTypes = {
   cssCustomMenu: PropTypes.string
}

const mapStateToProps = (state) => ({
   tokenDuck: state.tokenDuck,
   userDuck: state.userDuck,
   propertyDuck: state.propertyDuck,
})
export default connect(mapStateToProps)(Navbar);