import React, { useState, useEffect, useRef } from 'react'
import './Rooms.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faInfoCircle, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import UiButton from '../ui/buttons/uiButtons/UiButton';
import { servicesToIcons } from '../../../../utils/serviceIdToFAIcon/servicesToIcons';
import UiSelect from '../ui/uiSelect/UiSelect';

function Rooms(props) {

    console.log('stored', props.stored)
    const ref = useRef();
    const { t } = useTranslation();
    const [state, setState] = useState({
        selected: props.stored !== undefined ? true : false,
        selectValue: 1
    })

    useEffect(() => {

        props.callback(props.temp_id, state.selected, {
            price: props.price,
            title: props.title,
            count: state.selectValue
        })
        console.log('fro', state.selectValue, props.title)
    }, [state.selected])


    const generateServicesIcon = ((service, index) => {
        return <span key={index}>
            <FontAwesomeIcon className="services_icon" icon={servicesToIcons[service].icon} />
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
        for (let index = 1; index <= props.count; index++) {
            arrayData.push(index)
        }
        return arrayData;
    }

    const handleNumberOfRooms = (e) => {
        console.log('e', e)
        state.selectValue = e;
    }


    const selectedButton = () => {
        setState({
            ...state,
            selected: !state.selected
        })
    }
    /* The following css class structure is optimized to be used with flex */
    return (
        <div className='rooms_card_container'>
            <div className='title_info'>
                <h2>{props.title}</h2>
                <FontAwesomeIcon className="info_icon" icon={faInfoCircle} />
            </div>
            <div className='description_container'>
                <div className='number_people_container'>
                    <div className='people_container'>{generatePeopleIcon()}<span>{props.numberOfPeople > 1 ? t("fe.components.rooms.people") : t("fe.components.rooms.person")}</span></div>
                </div>
                <div className='services_price_container'>
                    <div>
                        {props.services.map(generateServicesIcon)}
                    </div>
                    <div className='price_container'>
                        <p>{`${t("fe.components.rooms.price")} ${props.numberOfNights} ${props.numberOfNights > 1 ? t("fe.components.rooms.nights") : t("fe.components.rooms.night")}`}</p>
                        <p className="price_room">{props.price}&euro;</p>
                    </div>
                </div>
            </div>

            <div className='ui_components_container'>
                <UiButton
                    className="button_room"
                    label={(state.selected === true ? 'checked' : '') + ' ' + 'selected'}
                    callback={selectedButton}

                />
                <UiSelect
                    cssClass="select_on_roomCard"
                    selected={state.selected}
                    data={generateMaxRooms()}
                    callback={handleNumberOfRooms}
                />

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