import React from 'react'
import './SettingsCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { useNavigate } from 'react-router';
import { routes } from '../../../../routes/routes';

export default function SettingsCard(props) {
    const navigate = useNavigate();

    const handleNavigation = (params) => () => {
        if (params === 'GOTOREGHOST') {
            return navigate('/dashboard/host-registration')
        } else if (params === 'GOTOMYSTRUCTURE') {
            return navigate('/dashboard')
        }
        return navigate(routes[params])
    }

    return (
        <div className='settings_list_card fsL br1' onClick={handleNavigation(props.path.toUpperCase())} >
            <div className={`settings_card_container flex aiCenter ${props.className}`}>
                <div className='position flex aiCenter'>
                    <FontAwesomeIcon className='icon' icon={props.icon} />
                    <h3 className='m1'>{props.name}</h3>
                </div>
            </div>
        </div>

    )
}
