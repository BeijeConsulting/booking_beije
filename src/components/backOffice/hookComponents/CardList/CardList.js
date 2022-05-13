import { React } from "react";
import PropTypes from "prop-types";

import "./CardList.less"
import HorizontalCard from "../HorizontalCard/HorizontalCard";
import { Pagination } from "antd";

const CardList = (props) => {
    return (
        <section className={"section_container"}>
            <h2>{props.sectionTitle}</h2>
            <div className={"action_bar"}>
                {props.actions}
            </div>

            <div className={"card_list"}>
                {
                    props.cards.map(renderCards)
                }
            </div>

            <div className={"pagination"}>
                <Pagination
                    defaultCurrent={props.currentPage}
                    total={props.totalPages}
                />
            </div>

        </section>
    )
}

const renderCards = (card, key) => {
    return <HorizontalCard
        imageSrc={card?.img}
        title={card?.title}
        text={card?.text}
        key={key}

    />
}
CardList.defaultProps = {

}

CardList.propTypes = {

}

export default CardList;