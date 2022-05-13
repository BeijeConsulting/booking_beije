import { React } from "react";
import PropTypes from "prop-types";

import "./HorizontalCard.less"

// AntDesign COMPONENTS
import { Button } from "antd";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const HorizontalCard = (props) => {
    return (
        <div className={"h_card_container"}>
            <img className={"card_img"} src={"https://picsum.photos/500/300"} alt={"alternative text"} />

            <div className={"card_body"}>
                <div className={"card_main"}>

                    <div className={"left_col"}>
                        <h5 className={"card_title"}>
                            {props.title}
                        </h5>
                        <p className="card_text">
                            {props.text}

                        </p>
                    </div>

                    {/* Upper right corner (typically used for action buttons or badge-like icons) */}
                    <div className={"right_col"}>
                        {props.upperRightContent}
                    </div>
                </div>

                <div className={"card_footer"}>
                    {props.footerContent}
                </div>
            </div>
        </div>
    )
}

HorizontalCard.defaultProps = {
    title: "Card title",
    text: "Card text here, it should handle overflow with ellipsis truncation",
    footerContent: <Button type="primary" > Button</ Button>,
    upperRightContent: <FontAwesomeIcon icon={faCrown} />
}

HorizontalCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,

}

export default HorizontalCard;