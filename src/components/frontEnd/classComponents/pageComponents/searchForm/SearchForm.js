// import FullCalendar from '@fullcalendar/react';
import React, { Component } from 'react';
import { t } from "i18next";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // plugin
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


// components
import FormButton from '../../../funcComponents/ui/buttons/formButton/FormButton';
import SearchPlace from '../../../hookComponents/ui/searchPlace/SearchPlace';

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
    }

    
    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleSelect = (e) => {
        console.log(e);
    }
    
    
    handleUnSelect = (e) => {
        console.log(e);
    }

    renderEventCalendar = (item, key) => {
        return { title: `Structure: ${item.name} - Room: ${item.room}`, start: item.from, end: item.to, backgroundColor: "#FFF9F5", className: ["background_event"] }
    }

    render() {
        return (
            <>
                <section className='searchFormContainer'>
                    <form>
                        <SearchPlace />

                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            selectable
                            select={this.handleSelect}
                            unselect={this.handleUnSelect}
                            events={
                                this.state.dataInfo.map(this.renderEventCalendar)
                            }
                        />

                        <FormButton className="btn-primary" label={t("common.send")} callback={this.handleSubmit} disabled={this.state.isDisable} />

                    </form>
                </section>
            </>
        )
    }
}

export default SearchForm;