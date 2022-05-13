import React from 'react'
import './Logo.less'
import LogoImage from '../../../../assets/logo.jpg'
function Logo() {
    return (
        <source className='logo_container'>
            <source media="" srcset={LogoImage}>  </source>
            <source media="" srcset={LogoImage}>  </source>
            <img src={LogoImage}> </img>
        </source>
    )
}

export default Logo