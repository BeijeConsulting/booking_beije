import { React } from "react";
import PropTypes from "prop-types";

import "./HostAccount.less"

// COMPONENTS
import { Button } from "antd";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";

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
            actions={<>
                <Button type={"primary"}>Add rooms</Button>
                <Button>Delete rooms</Button>
            </>
            }
            cards={cardsTest}
            currentPage={1} // currently doesn't work
            totalPages={5} // currently doesn't work

        />
    </>
}

HostAccount.defaultProps = {

}

HostAccount.propTypes = {

}

export default HostAccount;