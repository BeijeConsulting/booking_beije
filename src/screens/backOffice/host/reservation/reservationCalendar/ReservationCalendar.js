import React, { useState } from 'react'

//PROP-TYPES
// import propTypes from './prop-types'

//STYLE
import './ReservationCalendar.less'

//Transition
import { useTranslation } from 'react-i18next'

//FULLCALENDAR
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import ChoiceButton from '../../../../../components/backOffice/hookComponents/choiceButton/ChoiceButton'



const ReservationCalendar = (props) => {

    const { t } = useTranslation()


    const arrTest = [
        { id: 1, name: 'Hotel XO', room: 'luxury', from: '2022-05-13', to: '2022-05-17', acceptedStatus: 'accettato' },
        { id: 2, name: 'Hotel Hilton', room: 'luxury', from: '2022-06-01', to: '2022-06-07', acceptedStatus: 'rifiutato' },
        { id: 3, name: 'Villa Firenze', from: '2022-05-17', to: '2022-05-20', acceptedStatus: 'attesa' },
        { id: 4, name: 'Bella vita', room: 'luxury', from: '2022-05-20', to: '2022-05-23', acceptedStatus: 'rifiutato' },
        { id: 5, name: 'Hello world', room: 'luxury', from: '2022-05-25', to: '2022-05-30', acceptedStatus: 'attesa' }
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




    //Da completare size di calendar
    return (
        <div className="container_calendar">

            <ChoiceButton
                firstButtonName={"Accettati"}
                secondButtonName={"In attesa"}
                thirdButtonName={"Rifiutato"}
                callbackFirstButton={handlerAccepted}
                callbackSecondButton={handlerWaiting}
                callbackThirdButton={handlerRejected}
            />

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={
                    state.dataInfo.map(item => ({
                        title: item.name, start: item.from, end: item.to, className: ["background_event"]
                    }))
                }
            />
        </div>
    )
}
export default ReservationCalendar