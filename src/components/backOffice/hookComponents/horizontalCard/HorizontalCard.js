import { React } from "react";
import PropTypes from "prop-types";

//STYLE
import "./HorizontalCard.scss"

const HorizontalCard = (props) => {

    const {
        callback,
        imageSrc,
        imageAlt,
        title,
        subtitle,
        text,
        upperRightContent,
        footerContent,
        footerContentLeft,
        footerContentRight
    } = props

    const handleCardClick = (e) => {
        if ("callback" in props) {
            callback(e);
        }

    }

    return (
        <div className={"h_card_container"} >
            {/* Card image */}
            {imageSrc &&
                <img className={"card_img"} src={imageSrc} alt={imageAlt} onClick={handleCardClick} />
            }

            {/* Card body */}
            <div className={"card_body"}>
                <div className={"card_main"}>

                    <div className={"left_col"}>
                        <h5 className={"card_title"}>
                            <a onClick={handleCardClick} >
                                {title}
                            </a>
                        </h5>

                        {subtitle &&
                            <p className="card_subtitle">{subtitle}</p>
                        }

                        {/* text overflows in mobile viewport. It should be truncated in CSS. Needs to be fixed!!*/}
                        <div className="card_text">
                            {text}
                        </div>
                    </div>

                    {/* Upper right corner (typically used for action buttons or badge-like icons) */}
                    {upperRightContent &&

                        <aside className={"right_col"}>
                            {upperRightContent}
                        </aside>
                    }
                </div>


                {/* Card Footer, typically contains primary/secondary buttons */}
                {
                    (footerContentLeft && footerContent) &&
                    <div className={"card_footer_right_and_left"}>
                        <div className={"left_col"}>
                            {footerContentLeft}
                        </div>
                        <div className={"right_col"}>
                            {footerContent}
                        </div>
                    </div>
                }

                {
                    (!footerContentLeft && footerContent) &&
                    < div className={"card_footer_right"}>
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
    imageSrc: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    callback: PropTypes.func,
    upperRightContent: PropTypes.any,
    footerContentLeft: PropTypes.any,
    footerContentRight: PropTypes.any,

}

export default HorizontalCard;