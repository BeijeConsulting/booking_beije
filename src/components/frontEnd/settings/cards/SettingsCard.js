import React from 'react'
import './SettingsCard.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'

export default function SettingsCard(props) {
    return (
        <div className={`settings_card_container ${props.className}`}>
            <FontAwesomeIcon icon={props.icon} />
            <h3>{props.name}</h3>
        </div>
    )
}
