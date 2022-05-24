import React from 'react'
import './Rooms.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import UiButton from '../ui/buttons/uiButtons/UiButton';
import { servicesToIcons } from '../../../../utils/serviceIdToFAIcon/servicesToIcons';
import UiSelect from '../ui/uiSelect/UiSelect';

function Rooms(props) {
    const { t } = useTranslation();



    const generateServicesIcon = ((service, index) => {
        return <span key={index}>
            <FontAwesomeIcon icon={servicesToIcons[service].icon} />
        </span>
    })

    /* Generate a N number of User icon, where N is the number passed by props.numberOfPeople */
    const generatePeopleIcon = () => {
        let userIcon = [];
        for (let index = 0; index < props.numberOfPeople; index++) {
            userIcon.push(<span key={index}>
                <FontAwesomeIcon icon={faUser} />
            </span>);
        }
        return userIcon
    }
    const generateMaxRooms = () => {
        let arrayData = []
        for (let index = 1; index < props.count + 1; index++) {
            arrayData.push(index)
        }
        console.log('select', props.count, arrayData)
        return arrayData;
    }
    /* The following css class structure is optimized to be used with flex */
    return (
        <div className='rooms_card_container'>
            <div className='title_info'>
                <h2>{props.title}</h2>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
            <div className='description_container'>
                <div className='number_people_container'>
                    <div className='people_container'>{generatePeopleIcon()}</div> {props.numberOfPeople > 1 ? t("fe.components.rooms.people") : t("fe.components.rooms.person")}
                </div>
                <div className='services_price_container'>{props.services.map(generateServicesIcon)}</div>
                <div className='price_container'>
                    <p>{`${t("fe.components.rooms.price")} ${props.numberOfNights} ${props.numberOfNights > 1 ? t("fe.components.rooms.nights") : t("fe.components.rooms.night")}`}</p>
                    <p>{props.price}&euro;</p>
                </div>
                <div className='ui_components_container'>
                    <UiButton
                        label={t("common.select")}
                    />
                    <UiSelect
                        data={generateMaxRooms()} />
                </div>
            </div>
        </div>
    )
}

Rooms.defaultProps = {
    numberOfPeople: 2,
    services: [0, 1, 2, 3],
    numberOfNights: 2
}

Rooms.propTypes = {
    numberOfPeople: PropTypes.number,
    numberOfNights: PropTypes.number,
    title: PropTypes.string
}


export default Rooms