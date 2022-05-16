import React from 'react'

//PROP-TYPES
// import propTypes from './prop-types'

//STYLE
import './reservationCalendar.less'

//FULLCALENDAR
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



const ReservationCalendar = (props) => {

    const arrTest = [
        { id: 1, name: 'Hotel XO', room: 'luxury', from: '2022-05-13', to: '2022-05-17' },
        { id: 2, name: 'Hotel Hilton', room: 'luxury', from: '2022-06-01', to: '2022-06-07' },
        { id: 3, name: 'Villa Firenze', from: '2022-05-17', to: '2022-05-20' },
        { id: 4, name: 'Bella vita', room: 'luxury', from: '2022-05-20', to: '2022-05-23' },
        { id: 5, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30' }
    ]



    //Da completare size di calendar
    return (
        <div className="container_calendar">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={
                    arrTest.map(item => ({
                        title: item.name, start: item.from, end: item.to, className: ["background_event"]
                    }))
                }
            />
        </div>
    )
}
export default ReservationCalendar