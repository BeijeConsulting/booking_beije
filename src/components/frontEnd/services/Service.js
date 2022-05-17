import React from 'react'
import './Service.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { useTranslation } from 'react-i18next';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const { t } = useTranslation();

function Service() {
    return (
        <div className='service_container'>
            <div className='service_icon'>
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <span>{props.iconName}</span>
        </div>
    )
}

Service.defaultProps = {
    icon: faGear,
    iconName: t("fe.components.service.service")
}
Service.propTypes = {
    icon: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
}
export default Service;
