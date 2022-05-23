import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom'

//LESS
import './profileMenuCSS/SingleConversation.less'

//CONNECT
import { connect } from 'react-redux'

import { Helmet } from 'react-helmet'
// import { messageToSenderIdGetApi } from '../../../services/api/messaggi/messaggiApi'
// import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";


import { Input } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";



let inputMessage = null;

const SingleConversation = (props) => {
  const myRef = useRef(null)
  const inputMessageRef = useRef()
  const location = useLocation()

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
    }, {
      id: 1,
      idSender: location.state.id,
      text: 'Lorem ipsum  congue,',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    },]
  }



  const [state, setState] = useState({
    msgArray: null,
  })

  useEffect(() => {

    if (state.msgArray === null) {
      setState({
        ...state,
        msgArray: singleConvers
      })
    }
    scrollToRef(myRef)

    /*  messageToSenderIdGetApi(location.state.id, getLocalStorage("token"))
     .then(res =>{
       setState({
         ...state,
         messages: res?.data
       })
     }) */
  }, [state])

  //function to scroll on last messages
  const scrollToRef = (ref) => myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })

  //function to set input value
  const handlerInput = (e) => {
    inputMessage = e.target.value
  }

  // function to submit message on enter press 
  const submitMessageOnEnter = (e) => {
    if (e.key === "Enter") {
      let objcopy = Object.assign({}, state)
      let obj = {
        idSender: 48,
        text: inputMessage,
        dateTime: "2000-22-22"
      }

      objcopy.msgArray.messages.push(obj);

      setState({
        ...state,
        msgArray: objcopy.msgArray
      })
      inputMessage = "";
      inputMessageRef.current.input.value = "";

    }

  }

  // function to submit on click in icon 
  const submitMessageOnSendPress = () => {
    let objcopy = Object.assign({}, state)
    let obj = {
      idSender: 48,
      text: inputMessage,
      dateTime: "2000-22-22"
    }

    objcopy.msgArray.messages.push(obj);

    setState({
      ...state,
      msgArray: objcopy.msgArray
    })
    inputMessageRef.current.input.value = "";
    // inputMessage = "";
  }

  // render chat 
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
        <div className="container_messages">

          <div className='back-button'><GoBackButton /></div>

          <h1 className='title'>{state?.msgArray?.announceName}</h1>
          {
            state?.msgArray?.messages?.map(renderConversation)
          }
          <span ref={myRef}></span>
        </div>


        <div className="space-input">
          <Input ref={inputMessageRef} onKeyPress={submitMessageOnEnter} onChange={handlerInput} className="send_message_input" size="large" placeholder="Write your message..." prefix={<FontAwesomeIcon onClick={submitMessageOnSendPress} className="icon_input_message" icon={faPaperPlane} />} />
        </div>
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  tokenDuck: state.tokenDuck
})

export default connect(mapStateToProps)(SingleConversation);

