// import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import { t } from "i18next";

// components
import FormButton from '../../../funcComponents/ui/buttons/formButton/FormButton';
import SearchPlace from '../../../hookComponents/ui/searchPlace/SearchPlace';
import { DatePicker, Space, } from 'antd';

// styles
import './SearchForm.less';
import InputGuest from '../../../hookComponents/ui/inputGuest/InputGuest';

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
         isDisable: true,
         dataInfo: arrTest
      }
      this.bookingData = {
         latitudine: 0,
         longitudine: 0,
         radius: 0,
         checkin: '',
         checkout: '',
         numberOfGuests: 0
      }
      this.dateFormat = 'YYYY-MM-DD';
   }

   handleSubmit = (e) => {
      e.preventDefault()
   }

   handleSelect = (e) => {
      console.log('start', e.start);
      console.log('end', e.end);
      console.log(e);
      this.bookingData.checkin = e.startStr;
      console.log('qui');
      this.bookingData.checkout = e.endStr;
      console.log(this.bookingData);
   }

   handleUnSelect = (e) => {
      console.log('start', e.start);
      console.log('end', e.end);
      // console.log(e);
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
            <section className='searchFormContainer'>
               <form>
                  <SearchPlace />

                  <Space direction="vertical" size={12}>
                     <DatePicker.RangePicker
                        format={this.dateFormat}
                        placeholder={['Checkin date', 'Checkout date']}
                        onChange={this.handleDateChange} />
                  </ Space>

                  <InputGuest />

                  <FormButton className="btn-primary" label={t("common.send")} callback={this.handleSubmit} disabled={this.state.isDisable} />

               </form>
            </section>
         </>
      )
   }
}

export default SearchForm;