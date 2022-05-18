import { React } from "react";

import "./HostAccount.less"

// COMPONENTS
import { Button } from "antd";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// UTILS

const HostAccount = (props) => {

    const cardsTest = [
        {
            img: "https://picsum.photos/200/300",
            title: "Camera bellissima",
            text: "Lorem ipsum dolor sit amet li mortacis delo reduxos",
            href: "notarealurl.io",
        },
        {
            img: "https://picsum.photos/200/300",
            title: "Camera bellissima",
            text: "Lorem ipsum dolor sit amet li mortacis delo reduxos",
            href: "notarealurl.io",
        },
        {
            img: "https://picsum.photos/200/300",
            title: "Camera bellissima",
            text: "Lorem ipsum dolor sit amet li mortacis delo reduxos",
            href: "notarealurl.io",
        },
        {
            img: "https://picsum.photos/200/300",
            title: "Camera bellissima",
            text: "Lorem ipsum dolor sit amet li mortacis delo reduxos",
            href: "notarealurl.io",
        },
        {
            img: "https://picsum.photos/200/300",
            title: "Camera bellissima",
            text: "Lorem ipsum dolor sit amet li mortacis delo reduxos",
            href: "notarealurl.io",
        },
    ];

    const goToDetails = (url) => (e) => {
        console.log(`go to ${url}`);
    }
    const renderCards = (card, key) => {
        return <HorizontalCard
            callback={goToDetails(`/announce/${key}`)}
            imageSrc={card?.img}
            title={card?.title}
            text={card?.text}
            key={key} //key should respect standard set in generalIteration
        />
    }


    const navigateTo = (e) => {
        console.log("navigate to ...", e);
    }
    const paginationProps = {
        itemsCount: 20,
        currentPage: 1,
        pageSize: 10,
        paginationCallback: navigateTo
    }

    return <>
        HostAccount screen

        {/* <HorizontalCard
            imageSrc: "https://picsum.photos/200/300"
            title="Card test"
            text="Card testing right now"
            upperRightContent={
                <Button>
                    <FontAwesomeIcon icon={faCrown} />
                </Button>
            }
            footerContent={<Button> Button test </Button>}
        /> */}

        <CardList
            sectionTitle={"Annunci"}
            actions={
                <>
                    <Button type={"primary"}>Add rooms</Button>
                    <Button>Delete rooms</Button>
                </>
            }
            {...paginationProps}
        >
            {/* {wrapperMap(HorizontalCard, cardsTest)} */}
            {cardsTest.map(renderCards)}
        </CardList>
    </>
}




export default HostAccount;