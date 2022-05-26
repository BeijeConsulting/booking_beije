import React from "react";

//STYLE
import "./PendingAnnounceList.scss"

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { Button } from "antd";


const PendingAnnounceList = () => {
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
            text: "Casa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a SavonaCasa in riva al mare a Savona"
        },
    ]

    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50, //get from backend
        pageSize: 10, //get from backend
        paginationCallback: switchToPage
    }


    const testCardOnClick = (e) => {
        console.log("CARD CLICK")
    }

    const renderPendingAnnounces = (announce, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            imageSrc={announce.img}
            altText={`${key}_${announce.title}`}
            title={announce.title}
            text={announce.text}
            callback={testCardOnClick}
            /* DA METTERE SOLO SE L'ANNUNCIO è ANCORA DA ACCETTARE O DECLINARE */
            footerContentLeft={
                <div className="left">
                    <p>FEDERICO FRASCà</p>
                    <p>124782487683</p>
                </div>
            }

            footerContent={
                <div className="right">
                    <Button className="pending_button" type="primary" onClick={() => console.log('ACCEPT')}>Accept</Button>
                    <Button className="pending_button" type="primary" onClick={() => console.log('DECLINE')}>Decline</Button>
                </div>
            }
        />
    }
    return (
        <>
            <CardList
                sectionTitle={"Pending announce list"}
                {...paginationProps}
            >
                {obj.map(renderPendingAnnounces)}
            </CardList>
        </>
    )
}


export default PendingAnnounceList;