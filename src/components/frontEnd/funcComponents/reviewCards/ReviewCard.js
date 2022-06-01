import React from 'react'
import './ReviewCard.scss';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import userImg from '../../../../assets/images/LoggedUser.png'

function ReviewCard(props) {

    return (
        <div className='review_card_container0'>
            <div className='user_info'>
                <img src={userImg}alt="img"></img>
                <h3>{props.username}</h3>
            </div>
            <span>{`${props.rating}/5`}</span>
            <h2>{props.userTitle}</h2>
            <p>{props.reviewDescription}</p>
        </div>
    )
}


ReviewCard.defaultProps = {
    username: t("fe.components.review.username"),
    title: t("fe.components.review.title"),
    description: t("common.description"),
    rating: 3
}

ReviewCard.propTypes = {
    username: PropTypes.string,
}

export default ReviewCard;
