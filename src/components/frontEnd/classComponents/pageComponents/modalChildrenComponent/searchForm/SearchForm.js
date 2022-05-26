// import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import { t } from "i18next";

// api
import { getStructuresBySearch } from '../../../../../../services/api/search/searchApi';

// components
import FormButton from '../../../../funcComponents/ui/buttons/formButton/FormButton';
import SearchPlace from '../../../../hookComponents/ui/searchPlace/SearchPlace';
import { DatePicker, Space, } from 'antd';

// redux
import { connect } from 'react-redux';

// router dom
import withRouting from '../../../../../../withRouting/withRouting';
import { routes } from '../../../../../../routes/routes';

// styles
import './SearchForm.scss';
import '../../../../../../assets/variables/_common.scss';
import InputGuest from '../../../../hookComponents/ui/inputGuest/InputGuest';

const arrTest = [
   { id: 1, name: 'Hotel XO', room: 'luxury', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'accettato' },
   { id: 2, name: 'Hotel Hilton', room: 'luxury', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'rifiutato' },
   { id: 3, name: 'Villa Firenze', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'attesa' },
   { id: 4, name: 'Bella vita', room: 'luxury', from: '2022-05-20', to: '2022-05-23', acceptedStatus: 'rifiutato' },
   { id: 5, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
   { id: 6, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
   { id: 7, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
]


class SearchForm extends Component {

   constructor(props) {
      super(props)
      this.state = {
         dataInfo: arrTest,
      }
      this.bookingData = {
         checkin: null,
         checkout: null,
         posti_letto: 2
      }
      this.dateFormat = 'YYYY-MM-DD';
   }

   // setNumberOfGuests = (e) => {
   //    this.bookingData.posti_letto = e;
   //    console.log(this.bookingData["posti_letto"]);
   // }

   objToString(obj) {

      let string = "";
      for (const item in obj) {
         if (obj[item] !== null) {

            string += `${item}=${obj[item]}&`
         }
      }
      let finalString = string.slice(0, -1);

      console.log(finalString);


      return finalString;
   }

   componentWillUnmount() {
      window.removeEventListener('guests', this.setNumberOfGuests);
   }

   handleSubmit = (e) => {
      e.preventDefault();
      const coordinate = {
         latitudine: null,
         longitudine: null,
         radius: 10,
      }
      this.bookingData.posti_letto = this.props.guestDuck.guest
      console.log(this.bookingData);
      let [latitude, longitude] = this.props.positionDuck.coordinates;
      coordinate.latitudine = latitude;
      coordinate.longitudine = longitude;


      getStructuresBySearch(this.objToString(this.bookingData), JSON.stringify(coordinate)).then(res =>
         this.props.router.navigate(routes.SEARCH, {
            state: res?.data
         })
      ).catch(error => error)
      this.props.router.navigate(routes.SEARCH, {
         state: {
            data: this.bookingData,
            coordinate: coordinate
         }
      })
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
            <section className='searchFormContainer flex aiCenter jcCenter mT1'>
               <form className='flex aiCenter jcSpaceE'>
                  <SearchPlace />

                  <Space direction="vertical" size={12}>
                     <DatePicker.RangePicker
                        format={this.dateFormat}
                        placeholder={['Checkin', 'Checkout']}
                        onChange={this.handleDateChange} />
                  </ Space>

                  <InputGuest />

                  <FormButton className="btn-primary" label={t("common.send")} callback={this.handleSubmit} />

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