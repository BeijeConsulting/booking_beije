import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import UiButton from '../ui/buttons/uiButtons/UiButton';
import UiSelect from '../ui/uiSelect/UiSelect';

// modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

// style
import './Rooms.scss';

// utils
import { servicesToIcons } from '../../../../utils/serviceIdToFAIcon/servicesToIcons';


function Rooms(props) {

   // const ref = useRef();
   const { t } = useTranslation();

   console.log(props.temp_id, props.stored);

   const goToRoom = () => {
      props.callbackGoToRoom()
   }
   const generateServicesIcon = ((service, index) => {
      const serviceType = servicesToIcons.find(serv => serv.id === service.id)
      return <span key={index}>
         <FontAwesomeIcon className="services_icon" icon={serviceType.icon} />
      </span>
   })
   /* Generate a N number of User icon, where N is the number passed by props.numberOfPeople */
   const generatePeopleIcon = () => {
      let userIcon = [];
      for (let index = 0; index < (props.numberOfPeople > 5 ? 5 : props.numberOfPeople); index++) {
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
            <FontAwesomeIcon onClick={goToRoom} className="info_icon" icon={faInfoCircle} />
         </div>

         <div className='description_container'>
            <div className='number_people_container'>
               <div className='people_container'>{generatePeopleIcon()}<span>{props.numberOfPeople > 1 ? t("fe.components.rooms.people") : t("fe.components.rooms.person")}</span></div>
            </div>
            <div className='description_container'>
               <div className='number_people_container'>
                  <div className='people_container'>{generatePeopleIcon()}<span> {props.numberOfPeople}{" "}{props.numberOfPeople > 1 ? t("fe.components.rooms.people") : t("fe.components.rooms.person")}</span></div>
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
               storedNOfRooms={props.stored?.count}
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

export default Rooms;