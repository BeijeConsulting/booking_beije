import React, { useState } from 'react'

//PROP-TYPES
// import propTypes from './prop-types'

//STYLE
import './ReservationCalendar.scss'

import { arrColor } from '../../../../../utils/color/color'

//FULLCALENDAR
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ChoiceButton from '../../../../../components/backOffice/hookComponents/choiceButton/ChoiceButton'

const ReservationCalendar = (props) => {



    {/* 
   const randomColor = (max, min) => {
        let color = Math.floor(Math.random() * (max - min) + min);
        console.log(color)
        return arrColor[color]
    }
    
    const { t } = useTranslation()
*/}



    const arrTest = [
        { id: 1, name: 'Hotel XO', room: 'luxury', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'accettato' },
        { id: 2, name: 'Hotel Hilton', room: 'luxury', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'rifiutato' },
        { id: 3, name: 'Villa Firenze', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'attesa' },
        { id: 4, name: 'Bella vita', room: 'luxury', from: '2022-05-20', to: '2022-05-23', acceptedStatus: 'rifiutato' },
        { id: 5, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
        { id: 6, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
        { id: 7, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' },
    ]

    const [state, setState] = useState({
        dataInfo: arrTest
    })
    const handlerAccepted = () => {
        const filterAccepted = arrTest.filter(item => item.acceptedStatus === 'accettato')

        setState({
            dataInfo: filterAccepted
        })
    }

    const handlerWaiting = () => {
        const filterWaiting = arrTest.filter(item => item.acceptedStatus === 'attesa')

        setState({
            dataInfo: filterWaiting
        })
    }

    const handlerRejected = () => {
        const filterRejected = arrTest.filter(item => item.acceptedStatus === 'rifiutato')

        setState({
            dataInfo: filterRejected
        })
    }
    //randomColor(0, arrColor.length - 1),

    const renderEventCalendar = (item, key) => {
        return { title: `Structure: ${item.name} - Room: ${item.room}`, start: item.from, end: item.to, backgroundColor: arrColor[key], className: ["background_event"] }
    }




    //Da completare size di calendar
    return (
        <div className="container_calendar">

            <div className="filter_button_container">
                <ChoiceButton
                    firstButtonName={"Accettati"}
                    secondButtonName={"In attesa"}
                    thirdButtonName={"Rifiutato"}
                    callbackFirstButton={handlerAccepted}
                    callbackSecondButton={handlerWaiting}
                    callbackThirdButton={handlerRejected}
                />
            </div>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={
                    state.dataInfo.map(renderEventCalendar)
                }
            />
        </div>
    )
}
export default ReservationCalendar