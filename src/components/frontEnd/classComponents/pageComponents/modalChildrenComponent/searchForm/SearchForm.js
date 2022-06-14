// import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import { t } from "i18next";

// utils
import { objToString } from '../../../../../../utils/Utils';

// api
import { getStructuresBySearch } from '../../../../../../services/api/search/searchApi';

// components
import FormButton from '../../../../funcComponents/ui/buttons/formButton/FormButton';
import SearchPlace from '../../../../hookComponents/ui/searchPlace/SearchPlace';
import { DatePicker, Space, } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationDot } from '@fortawesome/free-solid-svg-icons';

// redux
import { connect } from 'react-redux';

// router dom
import withRouting from '../../../../../../withRouting/withRouting';
import { routes } from '../../../../../../routes/routes';

// styles
import './SearchForm.scss';
import '../../../../../../assets/variables/_common.scss';
import InputGuest from '../../../../hookComponents/ui/inputGuest/InputGuest';

class SearchForm extends Component {

   constructor(props) {
      super(props)

      this.bookingData = {
         checkin: null,
         checkout: null,
         posti_letto: 2,
         latitudine: null,
         longitudine: null,
         radius: 10,
      }
      this.dateFormat = 'YYYY-MM-DD';
   }


   handleCallback = (response) => {
      this.props.data(response);
      this.props.callback(response);
   }

   handleSubmit = (e) => {
      e.preventDefault();

      this.bookingData.posti_letto = this.props.guestDuck.guest;

      let [latitude, longitude] = this.props.positionDuck.coordinates;

      this.bookingData.latitudine = latitude;
      this.bookingData.longitudine = longitude;

      if (this.props.router.location.pathname === '/home') {

         getStructuresBySearch(objToString(this.bookingData)).then(res => {
            this.props.router.navigate(routes.SEARCH, {
               state: {
                  property: res?.data
               }
            })
         }
         ).catch(error => error)
         // dovbbiamo fare un toast
      }


      if (this.props.router.location.pathname === '/search') {
         getStructuresBySearch(objToString(this.bookingData)).then(res => this.handleCallback(res?.data));
         this.props.handleParams(objToString(this.bookingData));

      }
   }

   handleSelect = (e) => {
      this.bookingData.checkin = e.startStr;
      this.bookingData.checkout = e.endStr;
   }

   handleUnSelect = (e) => {
      console.log('start', e.start);
      console.log('end', e.end);
   }

   renderEventCalendar = (item, key) => {
      return { title: `Structure: ${item.name} - Room: ${item.room}`, start: item.from, end: item.to, backgroundColor: "#FFF9F5", className: ["background_event"] }
   }

   handleDateChange = (e) => {
      this.bookingData.checkin = e[0].format(this.dateFormat);
      this.bookingData.checkout = e[1].format(this.dateFormat);
   }

   render() {
      return (
         <>
            <section className='searchFormContainer flex aiCenter jcCenter br3'>
               <form className='flex aiCenter jcSpaceE'>
                  <div className='flex aiCenter location-bar'>
                     <FontAwesomeIcon color='#fff9f5' icon={faLocationDot} />
                     <SearchPlace />
                  </div>

                  <div className='flex aiCenter jcSpaceB w100'>
                     <Space direction="vertical" size={12}>
                        <DatePicker.RangePicker
                           format={this.dateFormat}
                           placeholder={['Checkin', 'Checkout']}
                           onChange={this.handleDateChange}
                        />
                     </ Space>

                     <InputGuest />

                     <FormButton className="btn-primary m1 cursor send-search" label={t("common.send")} callback={this.handleSubmit} />
                     <div className='icon-search flex'>
                        <FontAwesomeIcon icon={faSearch} onClick={this.handleSubmit} />
                     </div>
                  </div>

               </form>
            </section>
         </>
      )
   }
}

const mapStateToProps = (state) => ({
   positionDuck: state.positionDuck,
   guestDuck: state.guestDuck
})

export default connect(mapStateToProps)(withRouting(SearchForm));