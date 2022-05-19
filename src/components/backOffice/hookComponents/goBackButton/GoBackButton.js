import React from "react"

import { useNavigate } from 'react-router-dom'

//Style
import './GoBackButton.less'

//FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



const GoBackButton = () => {

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




export default GoBackButton