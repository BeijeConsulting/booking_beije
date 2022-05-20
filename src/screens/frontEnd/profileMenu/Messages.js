import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//LESS
import './profileMenuCSS/Messages.less'


import { routes } from '../../../routes/routes'

import MessageCard from "../../../components/frontEnd/funcComponents/messageCard/MessageCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";



let arrayMessages = [{
  idSender: 21,
  senderName: 'samualeSPA',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
    date: "2022-05-20",
    time: "00:00:00"
  },
}, {
  idSender: 22,
  senderName: 'HotelMiraMao',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
    date: "2022-05-04",
    time: "00:00:00"
  },
}, {
  idSender: 23,
  senderName: 'BeigeHotel',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem ipsum dolor sit amet',
    date: "2022-2-10",
    time: "00:00:00"
  },
}, {
  idSender: 24,
  senderName: 'BauBauMicioMico 4stelle',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'Lorem',
    date: "2022-05-20",
    time: "10:00:00"
  },
}, {
  idSender: 25,
  senderName: 'CiaoRagazzi Hotel',
  senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
  lastMessage: {
    description: 'CiaoBelli',
    date: "2022-05-20",
    time: "02:44:02"
  },
}]


const Messages = () => {


  const [state, setState] = useState({})
  const vector = useNavigate()


  function renderMessages(mess, key) {
    return (
      <MessageCard key={key}
        title={mess.senderName}
        thumbnail={mess.senderProfileIcon}
        textMessage={mess.lastMessage.description}
        date={mess.lastMessage.date}
        callback={goToSingleConversation}
      />
    )
  }

  const goToSingleConversation = () => {
    vector(routes.SINGLECONVERSATION)
  }

  return (
    <div className='messages-page'>
      <div className='back-button'><GoBackButton /></div>

      <h1 className='title'>Messages</h1>
      {arrayMessages.map(renderMessages)}

      <div className="pagination"></div>
    </div>
  );
};

export default Messages