import React from 'react'
import './SettingsCard.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'

export default function SettingsCard(props) {
    return (
        <div className='settings_list_card'>
            <div className={`settings_card_container ${props.className}`}>
                <div className='position'>
                <FontAwesomeIcon className='icon' icon={props.icon} />
                <h3>{props.name}</h3>
                </div>
            </div>
        </div>

    )
}
