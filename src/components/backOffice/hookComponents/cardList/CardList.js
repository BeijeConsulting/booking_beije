import { React } from "react";
import PropTypes from "prop-types";

//STYLES
import "./CardList.less"

//COMPONENTS
import { Pagination } from "antd";

// UTILS


const CardList = (props) => {

    const handlePageSwitch = (clickedPage) => {
        props.paginationCallback(clickedPage)
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

            {/* Card list mapping passed as children */}
            <div className={"card_list"}>
                {/* Object's array map */}
                {props.children}
            </div>

            {/* Pagination (to be tested)*/}
            {/* <Pagination
                // defaultCurrent={1} //defaults to 1
                hideOnSinglePage={true}
                total={props.itemsCount} // *total* number of elements to arrange in pages
                pageSize={props.pageSize} // how many elements to show per page 
                onChange={handlePageSwitch}
            /> */}

        </section>
    )
}

CardList.defaultProps = {
}

CardList.propTypes = {
    sectionTitle: PropTypes.string,
    actions: PropTypes.any,
    children: PropTypes.arrayOf(PropTypes.object),
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number,
    paginationCallback: PropTypes.func.isRequired,
}

export default CardList;