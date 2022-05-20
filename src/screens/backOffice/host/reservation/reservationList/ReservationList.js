import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChoiceButton from "../../../../../components/backOffice/hookComponents/choiceButton/ChoiceButton";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard"

//ICON
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

//STYLE
import "./ReservationList.less"

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration"


const ReservationList = () => {
    const [state, setState] = useState([]) //state using for display announce categories

    const { t } = useTranslation()

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

    const showAccepted = () => {
        //api get accepted
        //setState announce accepted on state.api and
    }

    const showPending = () => {
        //api get accepted
        //setState announce pending
    }
    const showRejected = () => {
        //api get accepted
        //setState announce refused
    }

    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50,
        pageSize: 10,
        paginationCallback: switchToPage
    }

    return (

        <CardList
            sectionTitle={t("bo.screens.host.reservationList.title")}
            actions={
                <>
                    <ChoiceButton
                        callbackFirstButton={showAccepted}
                        firstButtonName={t("bo.screens.host.reservationList.accepted")}
                        callbackSecondButton={showPending}
                        secondButtonName={t("bo.screens.host.reservationList.pending")}
                        callbackThirdButton={showRejected}
                        thirdButtonName={t("bo.screens.host.reservationList.rejected")}
                    />
                    <Button onClick={showCalendar}
                        type="primary">
                        <FontAwesomeIcon
                            icon={faCalendar} />
                        {t("bo.screens.host.reservationList.calendar")}
                    </Button>
                </>
            }

            {...paginationProps}
        >
            {obj.map(renderReservations)}

        </CardList>
    )
}

const renderReservations = (structure, key) => {
    return <HorizontalCard
        key={`${key}-${randomKey()}`}
        imageSrc={structure.img}
        altText={`${key}_${structure.title}`}
        title={structure.title}
        text={structure.text}
    />
}

export default ReservationList;