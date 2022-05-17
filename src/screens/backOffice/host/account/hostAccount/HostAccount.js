import { React } from "react";
import PropTypes from "prop-types";

// STYLE
import "./HostAccount.less"

// COMPONENTS
import { Button } from "antd";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// UTILS
import { wrapperMap } from "../../../../../utils/generalIteration/generalIteration";

const HostAccount = (props) => {

    const cardsTest = [
        {
            imgSrc: "https://picsum.photos/200/300",
            accountName: "Camera bellissima",
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

    const navigateTo = (e) => {
        console.log("navigato to ...param", e);
    }
    const paginationVars = {
        numberOfItems: 20,
        currentPage: 2,
        pageSize: 10,
        callback: navigateTo
    }

    return <>
        HostAccount screen

        {/* DOWN BELOW ARE TESTS !!!! */}

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
            actions={<>
                <Button type={"primary"}>Add rooms</Button>
                <Button>Delete rooms</Button>
            </>
            }
            pagination={paginationVars}
        >
            {/* {wrapperMap(HorizontalCard, cardsTest)} */}
            {cardsTest.map(renderCards)}
        </CardList>
    </>
}

const renderCards = (card, key) => {
    return <HorizontalCard
        imageSrc={card?.img}
        title={card?.title}
        text={card?.text}
        key={key}
    />
}

HostAccount.defaultProps = {

}

HostAccount.propTypes = {

}

export default HostAccount;