import { React } from "react";
import PropTypes from "prop-types";

//STYLES
import "./CardList.less"

//COMPONENTS
import { Pagination } from "antd";

// UTILS


const CardList = (props) => {

    const handlePageSwitch = (e) => {
        props.paginationCallback(e)
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

            {/* Pagination (to be tested)*/}
            <div className={"pagination"}>
                <Pagination
                    // defaultCurrent={1} //defaults to 1
                    total={props.itemsCount}
                    current={props.currentPage}
                    pageSize={props.pageSize}
                    onChange={handlePageSwitch}
                />
            </div>

        </section>
    )
}

CardList.defaultProps = {
    pageSize: 10
}

CardList.propTypes = {
    sectionTitle: PropTypes.string,
    // paginationCallback:
}

export default CardList;