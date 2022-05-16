import React from "react";

//COMPONENTS
import CardList from "../../../../components/backOffice/hookComponents/CardList/CardList";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//ICON
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

//STYLE
import "./ReservationList.less"

const ReservationList = () => {
    const navigate = useNavigate()
    const obj = [
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        },
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        },
    ]

    const showCalendar = (e) => {
        
    }

    return (

        <CardList sectionTitle={"Reservation list"}
            actions={<Button onClick={showCalendar} type="primary"><FontAwesomeIcon icon={faCalendar} /> Calendar</Button>}
            cards={obj}
        />
    )
}


export default ReservationList;