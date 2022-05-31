import React from 'react'
import './Service.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { t } from 'i18next';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { servicesToIcons } from '../../../utils/serviceIdToFAIcon/servicesToIcons';


function Service(props) {
    return (
        <div className='service_container'>
            <div className='service_icon'>
                <FontAwesomeIcon icon={servicesToIcons[props.serviceId].icon} />
            </div>
            <span>{servicesToIcons[props.serviceId].name}</span>
        </div>
    )
}

Service.defaultProps = {
    icon: faGear,
    iconName: t("common.service")
}
Service.propTypes = {
    serviceId: PropTypes.number.isRequired,
}
export default Service;
