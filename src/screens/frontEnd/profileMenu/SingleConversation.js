import React, { useState, useEffect, useRef } from "react";
import {useParams } from 'react-router-dom'

// ROUTES 
import { routes } from '../../../routes/routes'


//LESS
import './profileMenuCSS/SingleConversation.less'

//CONNECT
import { connect } from 'react-redux'

import { Helmet } from 'react-helmet'
import { messageToSenderIdGetApi } from '../../../services/api/messaggi/messaggiApi'
import { getLocalStorage } from "../../../utils/localStorage/localStorage";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";


import { Input } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";



let inputMessage = null;

const SingleConversation = (props) => {
  const params = useParams();
  const myRef = useRef(null)
  const inputMessageRef = useRef()
  const singleConvers =
  {
    announceName: 'PizzaPazza',
    announceProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
    hostName: 'Ettore Vettori',
    messages: [{
      id: 1,
      idSender: params.id,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    }, {
      id: 2,
      idSender: 5,
      text: 'Lorem ipsum',
      dateTime: '2022-05-20'
    }, {
      id: 3,
      idSender: 5,
      text: 'Lorem ipsum 2',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: params.id,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: 48,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: 5,
      text: 'Lorem ipsum  congue,',
      dateTime: '2022-05-20'
    }, {
      id: 1,
      idSender: params.id,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse diam ipsum, cursus id placerat congue,',
      dateTime: '2022-05-20'
    },]
  }



  const [state, setState] = useState({
    msgArray: [],
    windowWidth: window.innerWidth
  })
  useEffect(() => {
    
    scrollToRef(myRef)
    function handleResize() {
      setState({
        ...state,
        windowWidth: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  })
  useEffect(() => {
    if (state.windowWidth < 992) {
      /*  messageToSenderIdGetApi(params.id, getLocalStorage("token"))
     .then(res =>{
       setState({
         ...state,
         msgArray: res?.data
       })
     }) */

     //da cancellare quando api prontee !
      setState({
        ...state,
        msgArray: singleConvers
      })
    } else if (state.windowWidth > 992) {
      /*  messageToSenderIdGetApi(params.id, getLocalStorage("token"))
     .then(res =>{
       setState({
         ...state,
         msgArray: res?.data
       })
     }) */

     //da cancellare quando api pronte !!!
      setState({
        ...state,
        msgArray:
        {
          announceName: 'PizzaPazza',
          announceProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
          hostName: 'Ettore Vettori',
          messages: [{
            id: 1,
            idSender: params.id,
            text: params.id,
            dateTime: '2022-05-20'
          }]
        }
      })
    } 
  }, [params.id])
  //function to scroll on last messages
  const scrollToRef = (ref) => myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
  //function to set input value
  const handlerInput = (e) => {
    inputMessage = e.target.value
  }

  // function to submit message on enter press 
  const submitMessageOnEnter = (e) => {
    if (e.key === "Enter") {
    //chiamata post API
      // Se risposta ok 

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
      

    }

  }

  // function to submit on click in icon 
  const submitMessageOnSendPress = () => {
    //chiamata post API
      // Se risposta ok 
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
  }

  // render chat 
  function renderConversation(mess, key) {
    return (

      <div key={key} className={mess.idSender === params.id ? "conversation conversation-host" : "conversation conversation-guest"}>
        <div>{
          mess.idSender === params.id ? singleConvers.announceName : 'You'
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
          {
            state.windowWidth < 992 &&
            <>
              <div className='back-button'><GoBackButton /></div>

              <h1 className='title'>{state?.msgArray?.announceName}</h1>
            </>
          }


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

