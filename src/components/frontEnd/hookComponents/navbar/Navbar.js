import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// less 
import './Navbar.less';

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
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// search component 

// proptypes 
import PropTypes from "prop-types";

// tokenDuck 
import { initToken } from '../../../../redux/ducks/tokenDuck';

// utils localstorage 
import { removeLocalStorage } from '../../../../utils/localStorage/localStorage';


function Navbar(props) {
    let vector = useNavigate();

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
        //chiamata API
        initToken()
        removeLocalStorage("token")
    }
    return (
        <>

            {
                //MOBILE
                props.stateLayout < 480 ?
                    <nav className="navMobile">
                        <button onClick={openModalSearch}>Search</button>
                        <Modal isOpen={state?.modalSearchIsOpen} callback={closeModalSearch}>Modal search to Build</Modal>
                        <button onClick={goTo('HOME')}>logo</button>
                        {
                            props.tokenDuck.token ?
                                <img className="iconIfLogged" onClick={goTo('SETTINGS')} src={LoggedUser} alt=""></img> :
                                <img className="iconNotLogged" onClick={goTo('LOGIN')} src={notLoggedUser} alt="user"></img>
                        }
                    </nav>
                    //DESKTOP
                    : <>
                        <nav className="navDesktop">
                            <span>logo</span>
                            {
                                props.tokenDuck.token ?


                                    <>{
                                        state.isMenuOpen === false ?
                                            < div className="hambMenu" onClick={handleNavMenu}>
                                                <FontAwesomeIcon className="arrowMenu" icon={faChevronLeft} />
                                                {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" className="phUser"/> */}
                                                <img className="phUser" src={LoggedUser} alt="profileUser" className="phUser" />
                                            </div>
                                            : <>
                                                <div className="hambMenu" onClick={handleNavMenu}>
                                                    <FontAwesomeIcon className="arrowMenuOpen" icon={faChevronLeft} />
                                                    {/* <img className="phUser" src={props.userDuck.user.image}alt="profileUser" className="phUser"/> */}
                                                    <img className="phUser" src={LoggedUser} alt="profileUser" className="phUser" />
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
                                <li onClick={goTo('SETTINGS')}>Account</li>
                                <li onClick={goTo('BOOKED')}>Bookings</li>
                                <li onClick={goTo('FAVOURITE')}>Favourites</li>
                                <li onClick={goTo('MESSAGES')}>Messages</li>
                                <li onClick={goTo('NOTFOUND')}>Become an Host</li>
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
    // userDuck: state.userDuck 
})
export default connect(mapStateToProps)(Navbar);