import React from 'react'

//PROP-TYPES
// import PropTypes from 'prop-types'

//STYLE
import './MessageList.less'

//COMPONENTS
import CardList from '../../../../../components/backOffice/hookComponents/cardList/CardList'
import HorizontalCard from '../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard'
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton'


const MessageList = (props) => {

    //TEST SE SEI HOST ALLORA TI FA VEDERE LE MESSAGI CON ADMIN INVECE  SE SEI ADMIN O GUEST NON TI FA VEDERE MESSAGI CON ADMIN
    let host = true

    const arrTest = [
        { id: 1, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 1', text: 'lorem hello world' },
        { id: 2, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 2', text: 'lorem bla bla' },
        { id: 3, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 3', text: 'lorem how are you?' },
    ]


    return (
        <div className="container_message_list">

            <GoBackButton />
            <h1 className="title_messages_page">Messages</h1>
            {
                host ? <div className="admin_message_list">
                    <HorizontalCard
                        title="Admin"
                        upperRightContent={'icon'}
                    />
                </div> : ''
            }

            <div >
                <CardList
                    cards={arrTest}
                />
            </div>
        </div>
    )
}

// MessageList.propTypes = {
//     dataMessage: PropTypes.array
// }

export default MessageList