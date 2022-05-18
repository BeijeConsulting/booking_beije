import { React } from "react";
import PropTypes from "prop-types";

//STYLE
import "./HorizontalCard.less"

const HorizontalCard = (props) => {

    // IGNORE THIS
    // needed for generalIteration -> wrapperMap function 
    // const { img, title, text, href } = props.item;

    const {
        callback,
        imageSrc,
        altText,
        title,
        text,
        upperRightContent,
        footerContent
    } = props

    const handleCardClick = (e) => {
        callback(e);
    }

    return (
        <div className={"h_card_container"} onClick={handleCardClick}>
            {/* Card image */}
            <img className={"card_img"} src={imageSrc} alt={altText} />

            {/* Card body */}
            <div className={"card_body"}>
                <div className={"card_main"}>
                    <div className={"left_col"}>
                        <h5 className={"card_title"}>
                            {title}
                        </h5>

                        {/* text overflows in mobile viewport. It should be truncated in CSS. Needs to be fixed!!*/}
                        <p className="card_text">
                            {text}
                        </p>
                    </div>

                    {/* Upper right corner (typically used for action buttons or badge-like icons) */}
                    {upperRightContent &&

                        <div className={"right_col"}>
                            {upperRightContent}
                        </div>
                    }
                </div>

                {/* Card Footer, typically contains primary/secondary buttons */}
                {footerContent &&

                    <div className={"card_footer"}>
                        {footerContent}
                    </div>
                }
            </div>
        </div>
    )
}

HorizontalCard.defaultProps = {
    title: "Card title",
    text: "Card body of text here, it should handle overflow with ellipsis truncation",
}

HorizontalCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    callback: PropTypes.func.isRequired,
    altText: PropTypes.string,
    upperRightContent: PropTypes.any,
    footerContent: PropTypes.any

}

export default HorizontalCard;