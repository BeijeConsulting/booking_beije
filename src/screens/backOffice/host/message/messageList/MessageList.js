
import React from 'react';
import { useNavigate } from 'react-router-dom';

//TRANSLATION
import { useTranslation } from 'react-i18next'

//STYLE
import './MessageList.less';

//COMPONENTS
import CardList from '../../../../../components/backOffice/hookComponents/cardList/CardList';
import HorizontalCard from '../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';
import GoBackButton from '../../../../../components/backOffice/hookComponents/goBackButton/GoBackButton';

//UTILS
import { routes } from '../../../../../routes/routes';
import { randomKey } from '../../../../../utils/generalIteration/generalIteration';

const MessageList = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    //TEST SE SEI HOST ALLORA TI FA VEDERE LE MESSAGI CON ADMIN INVECE  SE SEI ADMIN O GUEST NON TI FA VEDERE MESSAGI CON ADMIN
    let host = true

    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50,
        pageSize: 10,
        paginationCallback: switchToPage
    }

    const arrTest = [
        { id: 1, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 1', text: 'lorem hello world' },
        { id: 2, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 2', text: 'lorem bla bla' },
        { id: 3, img: 'https://cdn.pixabay.com/photo/2022/05/11/22/17/flowers-7190316_960_720.jpg', title: 'Test 3', text: 'lorem how are you?' },
    ]

    const goToChat = (idChat = null) => (e) => {
        navigate(`/${routes.DASHBOARD}/${routes.MESSAGE_CHAT}`, {
            state: { idChat: idChat },
        });
    };
    const renderMessages = (message, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            imageSrc={message.img}
            altText={`${key}_${message.title}`}
            title={message.title}
            text={message.text}
            callback={goToChat(key)}
        />
    }

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
                    {arrTest.map(renderMessages)}
                </CardList>
            </div>
        </div>
    )
}

export default MessageList;