import React from 'react'
import './SettingsCard.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { useNavigate } from 'react-router';
import { routes } from '../../../../routes/routes';

export default function SettingsCard(props) {
    const navigate = useNavigate();

    const handleNavigation = (params) => () => {
        navigate(routes[params])
     }

    return (
        <div className='settings_list_card' onClick={handleNavigation(props.path.toUpperCase())} >
            <div className={`settings_card_container ${props.className}`}>
                <div className='position'>
                <FontAwesomeIcon className='icon' icon={props.icon} />
                <h3>{props.name}</h3>
                </div>
            </div>
        </div>

    )
}
