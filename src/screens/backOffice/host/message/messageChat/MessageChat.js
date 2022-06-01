import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom'

//PROP-TYPES
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

//FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';


import { messageChatHostGetApi, messageSendForGuestApi } from '../../../../../services/api/messaggi/messaggiApi'
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';

//ANT-DESIGN
import {
    Input,
    Button
} from 'antd';

//STYLE
import './MessageChat.scss';

//COMPONENTS
import MessageCard from '../../../../../components/backOffice/hookComponents/messageCard/MessageCard';
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';

const MessageChat = (props) => {

    const [state, setState] = useState({
        listOfMessageChat: [],
        inputValue: ''
    })

    const { t } = useTranslation()
    const location = useLocation()

    //FETCHING MESSAGE CHAT
    const fetchingChatHost = async () => {
        const HEADER = getLocalStorage("token")
        let responseChat = await messageChatHostGetApi(location.state.idChat, HEADER)
        setState({
            ...state,
            listOfMessageChat: responseChat?.data
        })
    }

    //POST MESSAGE FROM HOST TO GUEST
    const sendMessageGestApi = async () => {
        const HEADER = getLocalStorage("token")
        let messageSendForGuest = await messageSendForGuestApi({
            annuncioId: location.state.idChat,
            contenuto: state.inputValue,
            receiverId: location.state.receverId
        }, HEADER)

        let responseChat = await messageChatHostGetApi(location.state.idChat, HEADER)
        setState({
            ...state,
            listOfMessageChat: responseChat?.data,
            inputValue: ''
        })
    }

    //VALUE INPUT
    const handlerInputValue = (event) => {
        setState({
            ...state,
            inputValue: event.target.value
        })
    }

    const renderSingleMessage = (item, key) => {
        return (
            <MessageCard
                key={key}
                classControll={localStorage.getItem('idUtente') == item.sender.id ? 'single_message_card_you' : 'single_message_card_response'}
                nameMessage={localStorage.getItem('idUtente') == item.sender.id ? 'Tu' : item.sender.name}
                bodyMessage={item.text}
                dateMessage={item.date_and_time}
            />
        )
    }

    useEffect(() => {
        fetchingChatHost()
    }, [])



    return (
        <div className="container_chat">
            <GoBackButton />
            <h1 className="title_messages_page">{t('common.messages')}</h1>
            <div className="message_overflow">
                {state.listOfMessageChat.length > 0 ? state.listOfMessageChat.map(renderSingleMessage) : <p>{t("common.noMessages")}</p>}

            </div>
            <Input value={state.inputValue} className="send_message_input" size="large" placeholder={t('common.writeMessage')} prefix={<FontAwesomeIcon className="icon_input_message" icon={faPaperPlane} />} onChange={handlerInputValue} />
            <Button className="button_send_message" type="primary" onClick={sendMessageGestApi}>{t('common.send')}</Button>

        </div>
    )
}


export default MessageChat;
