import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// less 
import './Navbar.less';

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


function Navbar(props) {
    let vector = useNavigate();

    const [state, setState] = useState({
        windowWidth: window.innerWidth,
        isMenuOpen: false
    })

    useEffect(() => {
        function handleResize() {
            setState({
                ...state,
                modalSearchIsOpen: false,
                windowWidth: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)

        return () => { window.removeEventListener('resize', handleResize) }
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
    // function to Go dimanic vector 
    const goTo = (params) => () => {
        vector(routes[params])
    }

    // function to Open Menu 
    const openNavMenu = () => {
        setState({
            ...state,
            isMenuOpen: !state.isMenuOpen
        })
    }
    return (
        <>
            {
                state.windowWidth < 480 ?
                    <nav className="navMobile">
                        <button onClick={openModalSearch}>Search</button>
                        <Modal isOpen={state?.modalSearchIsOpen} callback={closeModalSearch}>Modal search to Build</Modal>
                        <button onClick={goTo('HOME')}>logo</button>
                        {
                            props.tokenDuck.token ?
                                <button onClick={goTo('SETTING')}>account</button> :
                                <button onClick={goTo('LOGIN')}>goLogin</button>
                        }
                    </nav>
                    :
                    <nav className="navDesktop">
                        <span>logo</span>
                        {
                            props.tokenDuck.token ?


                                <>{state.isMenuOpen ?
                                    < div className="hambMenu" onClick={openNavMenu}>
                                        <FontAwesomeIcon className="arrowMenu" icon={faChevronLeft} />
                                        <span className="phUser"></span>
                                    </div>
                                    : <>
                                        <div className="hambMenu" onClick={openNavMenu}>
                                            <FontAwesomeIcon className="arrowMenuOpen" icon={faChevronLeft} />
                                            <span className="phUser"></span>
                                        </div>
                                        <div className="settingOpen">
                                            menuaperto
                                        </div>
                                        
                                    </>
                                }
                                </>
                                :
                                <span onClick={goTo('LOGIN')}>Login</span>
                        }
                    </nav>
            }
        </>

    )
}


const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck
})
export default connect(mapStateToProps)(Navbar);