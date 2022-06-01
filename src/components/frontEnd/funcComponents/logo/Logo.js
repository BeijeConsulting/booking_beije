import React from 'react'
import './Logo.scss'
import LogoImage from '../../../../assets/images/logo.png'

function Logo({callback, imgClass}) {
    return (
        <picture className='logo_container flex jcCenter' onClick={callback} >
            <source media="" srcSet={LogoImage}/>
            <img className={`iconIfLogged ofC br50 ${imgClass}`} src={LogoImage} alt =""/>
        </picture>
    )
}

export default Logo