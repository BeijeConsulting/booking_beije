import React from 'react'
// import PropTypes from "prop-types"

//LESS
import './MostReviewedApartments.scss'

function MostReviewedApartments(props) {

    const goToMRA = () =>{
        return props.callback()
    }

    return (
        <div className='card' onClick={goToMRA}>

        </div>
    )
}


// default props 
MostReviewedApartments.defaultProps = {
    classNameContent: 'card'
    /*  nameBtn: 'click',
     cssCustom: 'defaultBtn' */
}

// propTypes 
MostReviewedApartments.propTypes = {
    /*  styleBtn: PropTypes.string,
     cssCustom: PropTypes.string,
     callback: PropTypes.func.isRequired, */
    // nameBtn: PropTypes.string.isRequired 
}

export default MostReviewedApartments
