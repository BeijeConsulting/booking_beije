
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
import { messageListHostGetApi } from '../../../../../services/api/messaggi/messaggiApi'


const MessageList = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        listOfMessage: [],
        elementsTotal: null,
        loading: true
    })

    //TEST SE SEI HOST ALLORA TI FA VEDERE LE MESSAGI CON ADMIN INVECE  SE SEI ADMIN O GUEST NON TI FA VEDERE MESSAGI CON ADMIN
    let host = true

    const fetchingMessageHostApi = async () => {
        const HEADER = getLocalStorage("token")
        let responseMessageHostApi = await messageListHostGetApi(1, 3, HEADER)
        console.log(responseMessageHostApi)
        setState({
            ...state,
            listOfMessage: responseMessageHostApi?.data?.list,
            elementsTotal: responseMessageHostApi?.data?.elementsTotal
        })
    }

    const switchToPage = async (clickedPage) => {
        console.log("switch to page", clickedPage);

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

    const goToChat = (idChat = null) => (e) => {
        navigate(`/${routes.DASHBOARD}/${routes.MESSAGE_CHAT}`, {
            state: idChat
        });
    };

    // RESERVATION NUMBER ?????????

    const renderMessages = (message, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            imageSrc={message.lastMessaggio.sender.url_image}
            altText={`${key}_${message.title}`}
            title={message.lastMessaggio.insertion.struttura.nome_struttura}
            text={`Guest: ${message.lastMessaggio.sender.name}`}
            callback={goToChat(message.annuncioId)}
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
                host ? <div className="admin_message_list">
                    <HorizontalCard
                        title="Admin"
                        upperRightContent={'icon'}
                    />
                </div> : ''
            }

            <div >
                <CardList
                    {...paginationProps}
                >
                    {state.listOfMessage.map(renderMessages)}
                </CardList>
            </div>
        </div>
    )
}

export default MessageList;