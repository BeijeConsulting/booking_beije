import React from "react"

import { useNavigate } from 'react-router-dom'

//Style
import './GoBackButton.scss'
import '../../../../assets/variables/_common.scss'


//FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'



const GoBackButton = ({route}) => {

    const navigate = useNavigate()

    const handlerClick = (route = -1) => ()=> {
        navigate(route)
    }
    return (
        <>
            <FontAwesomeIcon className="button_go_back p1 flex jcStart" icon={faChevronLeft} onClick={handlerClick(route)} />
        </>
    )
}




export default GoBackButton