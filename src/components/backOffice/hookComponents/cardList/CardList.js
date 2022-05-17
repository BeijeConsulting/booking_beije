import { React } from "react";
import PropTypes from "prop-types";

//STYLES
import "./CardList.less"

//COMPONENTS
import HorizontalCard from '../horizontalCard/HorizontalCard';
import { Pagination } from "antd";

// UTILS


const CardList = (props) => {

    const handlePageSwitch = (e) => {
        // console.log("navigate to ...");
        props.pagination.callback(e)
    }
    return (
        <section className={"section_container"}>

            {/* Section title */}
            {props.sectionTitle &&
                <h2>{props.sectionTitle}</h2>
            }

            {/* Actions: buttons, anchors, interactive elements outside cards */}
            {props.actions &&
                <div className={"action_bar"}>
                    {props.actions}
                </div>
            }

            {/* Card list */}
            <div className={"card_list"}>
                {props.children}
            </div>

            {/* Pagination (yet to test)*/}
            <div className={"pagination"}>
                <Pagination
                    // defaultCurrent={1} //optional
                    total={props.pagination.numberOfItems}
                    current={props.pagination.currentPage}
                    pageSize={props.pagination.pageSize}
                    onChange={handlePageSwitch}
                />;
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
    sectionTitle: PropTypes.string,
}

export default CardList;