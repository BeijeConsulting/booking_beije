import React, { useState, useEffect } from 'react'
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
   const [state, setState] = useState({
      selected: props?.stored !== undefined ? true : false,
      selectValue: 1
   })

   useEffect(() => {
      props.callback(props.temp_id, state.selected, {
         price: props.price,
         title: props.title,
         id: props.temp_id,
         count: props.stored !== undefined ? props.stored.count : state.selectValue
      })
   }, [state.selected])

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
               <div className='people_container'>{generatePeopleIcon()}<span> {t("fe.components.rooms.people", { count: props.numberOfPeople })}</span></div>
            </div>
            <div className='services_price_container'>
               <div>
                  {
                     props?.services &&
                     <>
                        {props?.services.map(generateServicesIcon)}
                     </>

                  }
               </div>
               <div className='price_container'>
                  <p>{t("fe.components.rooms.priceForNumberOfNights", { count: props.numberOfNights })}</p>
                  <p className="price_room">
                     {t('fe.screens.checkout.total')} {t('common.currencyTwoFractionDigits', { price: props.price })}
                  </p>
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


export default Rooms