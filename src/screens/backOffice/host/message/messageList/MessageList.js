
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//TRANSLATION
import { useTranslation } from 'react-i18next'

//STYLE
import './MessageList.scss';

//COMPONENTS
import CardList from '../../../../../components/backOffice/hookComponents/cardList/CardList';
import HorizontalCard from '../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';

//UTILS
import { routes } from '../../../../../routes/routes';
import { randomKey } from '../../../../../utils/generalIteration/generalIteration';

import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';
import { messageListHostGetApi, messageGetAdmin } from '../../../../../services/api/messaggi/messaggiApi'


const MessageList = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        listOfMessage: [],
        elementsTotal: 1,
        loading: true,
        permessionHost: ''
    })

    // console.log(props.userDuck.user.auth[1])
    //TEST SE SEI HOST ALLORA TI FA VEDERE LE MESSAGI CON ADMIN INVECE  SE SEI ADMIN O GUEST NON TI FA VEDERE MESSAGI CON ADMIN


    const fetchingMessageHostApi = async () => {
        const HEADER = getLocalStorage("token")
        let responseMessageHostApi = await messageListHostGetApi(1, 3, HEADER)
        setState({
            ...state,
            listOfMessage: responseMessageHostApi?.data?.list,
            elementsTotal: responseMessageHostApi?.data?.elementsTotal
        })
    }

    const switchToPage = async (clickedPage) => {

        const HEADER = getLocalStorage("token")
        let responsePaginationMessageApiHost = await messageListHostGetApi(clickedPage, 3, HEADER)

        setState({
            ...state,
            listOfMessage: responsePaginationMessageApiHost?.data?.list,
            elementsTotal: responsePaginationMessageApiHost?.data?.elementsTotal
        })

    }

    const paginationProps = {
        itemsCount: state.elementsTotal,
        pageSize: 10,
        paginationCallback: switchToPage
    }

    const goToChat = (idChat, receverId) => (e) => {
        navigate(`/${routes.DASHBOARD}/${routes.MESSAGE_CHAT}`, {
            state: {
                idChat,
                receverId
            }
        });
    };

    // const goToChatWithAdmin = async () => {
    //     const HEADER = getLocalStorage("token");
    //     let responseMessageAdmin = await messageGetAdmin(HEADER);
    //     console.log(responseMessageAdmin)
    // }

    // RESERVATION NUMBER ?????????

    const renderMessages = (message, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            imageSrc={message?.lastMessaggio?.sender.url_image}
            altText={`${key}_${message.title}`}
            title={message?.lastMessaggio?.insertion?.struttura.nome_struttura}
            text={`Guest: ${message?.lastMessaggio?.sender.name}`}
            callback={goToChat(message?.annuncioId, message?.lastMessaggio?.receiver.id)}
        />
    }



    useEffect(() => {
        fetchingMessageHostApi()
    }, [])

    return (
        <div className="container_message_list">

            <GoBackButton />
            <h1 className="title_messages_page">{t("common.messages")}</h1>
            {
                !state.permessionHost ? <div className="admin_message_list">
                    <HorizontalCard
                        title="Admin"
                        upperRightContent={'icon'}
                    // callback={goToChatWithAdmin()}
                    />
                </div> : ''
            }

            <div >
                <CardList
                    {...paginationProps}
                >
                    {state.listOfMessage.length < 0 ? <p>Non ci sono messagi...</p> : state.listOfMessage.map(renderMessages)}
                </CardList>
            </div>
        </div>
    )
}

export default MessageList;