import React from 'react';
import { useTranslation } from 'react-i18next';

//PROP-TYPES
import PropTypes from 'prop-types';

//FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

//ANT-DESIGN
import {
    Input,
    Button
} from 'antd';

//STYLE
import './MessageChat.less';

//COMPONENTS
import MessageCard from '../../../../../components/backOffice/hookComponents/messageCard/MessageCard';
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';

const MessageChat = (props) => {

    const { t } = useTranslation()

    //TEST--------
    const messageUser = [
        {
            id: 1,
            name: 'Test',
            body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, harum iste ab earum tempora, recusandae debitis mollitia eos ea esse eaque culpa quis dicta? Laudantium voluptas velit officia rerum eos.',
            date: '2022/05/30',
            time: '13:00'
        },
        {
            id: 2,
            name: 'You',
            body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, harum iste ab earum tempora, recusandae debitis mollitia eos ea esse eaque culpa quis dicta? Laudantium voluptas velit officia rerum eos.',
            date: '2022/06/03',
            time: '9:00'
        },
        {
            id: 3,
            name: 'Test',
            body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, harum iste ab earum tempora, recusandae debitis mollitia eos ea esse eaque culpa quis dicta? Laudantium voluptas velit officia rerum eos.',
            date: '2022/06/03',
            time: '9:00'
        },
        {
            id: 4,
            name: 'You',
            body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, harum iste ab earum tempora, recusandae debitis mollitia eos ea esse eaque culpa quis dicta? Laudantium voluptas velit officia rerum eos.',
            date: '2022/06/03',
            time: '9:00'
        },
        {
            id: 5,
            name: 'Test',
            body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, harum iste ab earum tempora, recusandae debitis mollitia eos ea esse eaque culpa quis dicta? Laudantium voluptas velit officia rerum eos.',
            date: '2022/06/03',
            time: '9:00'
        }
    ]

    const renderSingleMessage = (item, key) => {
        return (
            <MessageCard
                key={key}
                nameMessage={item.name}
                bodyMessage={item.body}
                dateMessage={item.date}
                timeMessage={item.time}
            />
        )
    }


    return (
        <div className="container_chat">
            <GoBackButton />
            <h1 className="title_messages_page">{t('common.messages')}</h1>
            <div className="message_overflow">
                {!props.dataUser ? messageUser.map(renderSingleMessage) : <p>{t("common.noMessages")}</p>}
            </div>
            <Input className="send_message_input" size="large" placeholder={t('common.writeMessage')} prefix={<FontAwesomeIcon className="icon_input_message" icon={faPaperPlane} />} />
            <Button className="button_send_message" type="primary">{t('common.send')}</Button>

        </div>
    )
}


MessageChat.propTypes = {
    dataUser: PropTypes.array
};


export default MessageChat;