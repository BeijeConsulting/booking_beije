import React from 'react'
import './Logo.less'
import LogoImage from '../../../../assets/logo.jpg'
function Logo() {
    return (
        <picture className='logo_container'>
            <source media="" srcSet={LogoImage}/>
            <img src={LogoImage} alt =""/>
        </picture>
    )
}

export default Logo