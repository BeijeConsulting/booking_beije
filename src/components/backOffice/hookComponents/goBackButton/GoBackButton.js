import React from "react"
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

//Style
import './GoBackButton.less'

//FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



const GoBackButton = (props) => {

    const navigate = useNavigate()

    const handlerClick = () => {
        navigate(-1)
    }
    return (
        <>
            <FontAwesomeIcon className="button_go_back" icon={faChevronLeft} onClick={handlerClick} />
        </>
    )
}


// GoBackButton.propTypes = {
//     callback: PropTypes.func.isRequired
// }

export default GoBackButton