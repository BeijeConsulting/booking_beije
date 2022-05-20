import React, { useState } from "react";
import { useNavigate } from "react-router";
// translation 
import { useTranslation } from 'react-i18next';

// less 
import './Navbar.less';

import LanguagesSwitch from "../../../common/languagesSwitch/LanguagesSwitch";

// profile image 
import LoggedUser from '../../../../assets/images/LoggedUser.png';
import notLoggedUser from '../../../../assets/images/notLoggedUser.png';


// connect to redux 
import { connect } from "react-redux";

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

// tokenDuck 
import { initToken } from '../../../../redux/ducks/tokenDuck';
// userDuck
import { initUser } from '../../../../redux/ducks/userDuck'

// utils localstorage 
import { removeLocalStorage } from '../../../../utils/localStorage/localStorage';


//da cancellare quando implementato duck user
let permission = 'host';

function Navbar(props) {
    let vector = useNavigate();
    const { t } = useTranslation();


    const [state, setState] = useState({
        // windowWidth: window.innerWidth,
        isMenuOpen: false,
        modalSearchIsOpen: false,
    })

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
        props.dispatch(initUser());
        props.dispatch(initToken());
        removeLocalStorage("token");
        removeLocalStorage("refreshToken");
        vector(routes.LAYOUT);
    }
    return (
        <>

            {
                //MOBILE
                props.stateLayout < 480 ?
                    <nav className="navMobile">
                        <FontAwesomeIcon className="iconSearch" onClick={openModalSearch} icon={faSearch} />
                        <Modal isOpen={state?.modalSearchIsOpen} callback={closeModalSearch}>Modal search to Build</Modal>

                        {/* <img src="LOGODEFAULT!!" alt="logo" onClick={goTo('HOME')}/> */}
                        <img className="iconIfLogged" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsc4qTZSUQxV6o6T_BX1Ak7PHlXMUBCkMpHN1llt7VWb3sVqXvATJDo03OUwzHLdSw9eY&usqp=CAU" alt="logo" onClick={goTo('HOME')} />

                        {
                            props.tokenDuck.token !== null ?
                                <img className="iconIfLogged" onClick={goTo('SETTINGS')} src={LoggedUser} alt=""></img> :
                                <img className="iconNotLogged" onClick={goTo('LOGIN')} src={notLoggedUser} alt="user"></img>
                        }
                    </nav>
                    //DESKTOP
                    : <>
                        <nav className="navDesktop">
                            <div>
                                <img onClick={goTo('HOME')} className="iconIfLogged" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsc4qTZSUQxV6o6T_BX1Ak7PHlXMUBCkMpHN1llt7VWb3sVqXvATJDo03OUwzHLdSw9eY&usqp=CAU" alt="logo" />
                                <LanguagesSwitch />
                            </div>


                            {
                                props.tokenDuck.token !== null ?


                                    <>{
                                        state.isMenuOpen === false ?
                                            < div className="hambMenu" >
                                                <FontAwesomeIcon className="arrowMenu" icon={faChevronLeft} onClick={handleNavMenu} />
                                                {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" /> */}
                                                <img className="phUser" src={LoggedUser} alt="profileUser" />
                                            </div>

                                            : <>
                                                <div className="hambMenu">
                                                    <FontAwesomeIcon className="arrowMenuOpen" icon={faChevronLeft} onClick={handleNavMenu} />
                                                    {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" /> */}
                                                    <img className="phUser" src={LoggedUser} alt="profileUser" />
                                                </div>
                                            </>
                                    }
                                    </>
                                    :
                                    <span onClick={goTo('LOGIN')}>Login</span>
                            }
                        </nav>
                        {
                            state.isMenuOpen &&
                            <ul className={props.cssCustomMenu}>
                                <li onClick={goTo('SETTINGS')}>{t('common.account')}</li>
                                <li onClick={goTo('BOOKED')}>{t('common.bookings')}</li>
                                <li onClick={goTo('FAVOURITE')}>{t('fe.screens.settings.settingsCard.favourites')}</li>
                                <li onClick={goTo('MESSAGES')}>{t('common.messages')}</li>
                                {
                                    // (props.userDuck.user.permission[0] === 'guest' )?
                                    // <li onClick={goTo('NOTFOUND')}>{t('fe.screens.guestAccount.becomeAHost')}</li> :
                                    permission === 'guest' ?
                                        <li onClick={goTo('NOTFOUND')}>{t('fe.screens.guestAccount.becomeAHost')}</li> :
                                        <li onClick={goTo('DASHBOARD')}>{t('fe.screens.settings.settingsCard.yourProperties')}</li>

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
    cssCustomMenu: 'settingOpen'
}

// propTypes 
Navbar.propTypes = {
    cssCustomMenu: PropTypes.string
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck
})
export default connect(mapStateToProps)(Navbar);