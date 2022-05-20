import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

//LESS
import './profileMenuCSS/SingleConversation.less'

import { Helmet } from 'react-helmet'
import { messageToSenderIdGetApi } from '../../../services/api/messaggi/messaggiApi'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";





const SingleConversation = () => {

  const location = useLocation()
  console.log(location.state.id)

  const singleConvers =
  {
    announceName: 'PizzaPazza',
    announceProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
    hostName: 'Ettore Vettori',
    messages: [{
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    }, {
      id: 2,
      idSender: location.state.id,
      text: 'Lorem ipsum',
      dateTime: '2022-05-20'
    }, {
      id: 3,
      idSender: location.state.id,
      text: 'Lorem ipsum 2',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    },{
      id: 1,
      idSender: location.state.id,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    },{
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    },]
  }



  const [state, setState] = useState({
    msgArray: []
  })

  useEffect(() => {


    setState({
      ...state,
      msgArray: singleConvers
    })


    /*  messageToSenderIdGetApi(location.state.id, getLocalStorage("token"))
     .then(res =>{
       setState({
         ...state,
         messages: res?.data
       })
     }) */
  }, [])

  function renderConversation(mess, key) {
    return (
      <div key={key} className={mess.idSender === location.state.id ? "conversation conversation-host" : "conversation conversation-guest"}>
        <div>{
          mess.idSender === location.state.id ? singleConvers.announceName : 'You'
        }
        </div>
        <p>{mess.text}</p>
        <div className="dateTimeMessage">{mess.dateTime}</div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>SingleConversation</title>
      </Helmet>
      <div className="singleConversation-page">
        <div className='back-button'><GoBackButton /></div>

        <h1 className='title'>{state.msgArray.announceName}</h1>
        {
          state?.msgArray?.messages?.map(renderConversation)
        }
      </div>
    </>
  );
};

export default SingleConversation
