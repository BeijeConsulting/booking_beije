import React from 'react'
import './ReviewCard.less';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

function ReviewCard() {

    return (
        <div className='review_card_container0'>
            <div className='user_info'>
                <img src=""></img>
                <h3>{props.username}</h3>
            </div>
            <h2>{props.userTitle}</h2>
            <p>{props.reviewDescription}</p>
        </div>
    )
}


ReviewCard.defaultProps = {
    username: t("fe.components.review.username"),
    title: t("fe.components.review.title"),
    description: t("fe.components.review.description")
}

PropertyCards.propTypes = {
    username: PropTypes.string,
    title: PropTypes.string,
}

export default ReviewCard;
