import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//HELMET
import { Helmet } from "react-helmet"

//LESS
import './profileMenuCSS/Messages.less'

//TRANSLATIONS
import { t } from "i18next";

//API
import { messageToReceiverIdGetApi } from '../../../services/api/messaggi/messaggiApi'

//LOCALSTORAGE
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//CONNECT
import { connect } from 'react-redux'

import { routes, routesDetails } from '../../../routes/routes'

import MessageCard from "../../../components/frontEnd/funcComponents/messageCard/MessageCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";



let arrayMessagesTest = [{
  idSender: 21,
  senderName: 'samualeSPA',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
    date: "2022-05-20",
    time: "00:00:00"
  }
}, {
  idSender: 22,
  senderName: 'HotelMiraMao',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
    date: "2022-05-04",
    time: "00:00:00"
  }
}, {
  idSender: 23,
  senderName: 'BeigeHotel',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet',
    date: "2022-2-10",
    time: "00:00:00"
  }
}, {
  idSender: 24,
  senderName: 'BauBauMicioMico 4stelle',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem',
    date: "2022-05-20",
    time: "10:00:00"
  }
}, {
  idSender: 25,
  senderName: 'CiaoRagazzi Hotel',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'CiaoBelli',
    date: "2022-05-20",
    time: "02:44:02"
  }
}
]


// modules


const Messages = (props) => {
  console.log(props.arrayOfChats)
  const [state, setState] = useState({
    windowWidth: window.innerWidth,
    arrayMessages: []
  })
  const vector = useNavigate()

  useEffect(() => {
    if (state.windowWidth > 991) {
      vector(routes.CHAT)
    }
    if (props.arrayOfChats !== []) {
      //chiamata api per settare array
      setState({
        ...state,
        arrayMessages: arrayMessagesTest
      })
    } else {
      setState({
        ...state,
        arrayMessages: props.arrayOfChats
      })
    }


    // messageToReceiverIdGetApi(120, getLocalStorage("token"))
    //   .then(res => {
    //     console.log('test', res)
    //   })
  }, [])
  useEffect(() => {
    function handleResize() {
      setState({
        ...state,
        windowWidth: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  })

  function renderMessages(mess, key) {
    return (
      <MessageCard key={key}
        title={mess.senderName}
        thumbnail={mess.senderProfileIcon}
        textMessage={mess.lastMessage.description}
        date={mess.lastMessage.date}
        callback={goToSingleConversation(mess.idSender)}
      />
    )
  }

  const goToSingleConversation = (idSender) => () => {
    if (state.windowWidth < 992) {
      vector(routesDetails.singleConversationMobile(idSender))
    } else {
      props.callback(idSender)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t("common.messages")}</title>
      </Helmet>

      <div className='messages-page'>
        {
          state.windowWidth < 992 &&
          <>
            <div className='back-button'><GoBackButton /></div>

            <h1 className='title'>Messages</h1>
          </>
        }

        {state.arrayMessages.map(renderMessages)}

        <div className="pagination"></div>
      </div>
    </>

  );
};


const mapStateToProps = (state) => ({
  tokenDuck: state.tokenDuck,
  userDuck: state.userDuck
})

export default connect(mapStateToProps)(Messages);
