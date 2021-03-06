import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'

// get local storage 
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//TRANSLATIONS
import { useTranslation } from 'react-i18next';

//LESS
import './profileMenuCSS/SingleConversation.scss'
import '../../../assets/variables/_common.scss'

//CONNECT
import { connect } from 'react-redux'
// HELMET 
import { Helmet } from 'react-helmet'
// API 
import { messageToSenderIdGetApi, messageInsertPostApi } from '../../../services/api/messaggi/messaggiApi'
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";


import { Input, Spin } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SingleConversation = (props) => {
   const { t } = useTranslation()
   const params = useParams();
   const myRef = useRef(null)
   const [state, setState] = useState({
      msgArray: [],
      windowWidth: window.innerWidth,
      inputMessage: "",
      isLoading: true
   })

   useEffect(() => {
      scrollToRef()
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
   })
   useEffect(() => {
      if (localStorage.getItem('token') !== null) {
         messageToSenderIdGetApi(params.id, getLocalStorage("token"))
            .then(res => {
               console.log(res?.data)
               setState({
                  ...state,
                  msgArray: res?.data,
                  isLoading: false
               })
            })
      }
   }, [params.id])

   // function to handle window resize 
   function handleResize() {
      setState({
         ...state,
         windowWidth: window.innerWidth
      })
   }

   //function to scroll on last messages
   const scrollToRef = () => myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })


   //function to set input value
   const handlerInput = (e) => {
      setState({
         ...state,
         inputMessage: e.target.value
      })
   }

   // function to submit message on enter press 
   const submitMessageOnEnter = (e) => {
      if (e.key === "Enter") {

         let objcopy = Object.assign({}, state)
         let obj = {
            annuncioId: params.id,
            contenuto: state.inputMessage,
            receiverId: state.msgArray[0]?.insertion?.struttura?.host?.user?.id
         }


         objcopy.msgArray.push(obj);
         // chiamata post API
         if (localStorage.getItem('token') !== null) {
            messageInsertPostApi(obj, getLocalStorage('token'))
               .then(res => {
                  messageToSenderIdGetApi(params.id, getLocalStorage("token"))
                     .then(res => {
                        setState({
                           ...state,
                           msgArray: res?.data,
                           inputMessage: ""
                        })
                     })
               }).catch((e) => {
                  console.log('errore', e)
               })
         }

      }

   }


   // function to submit on click in icon 
   const submitMessageOnSendPress = () => {
      let objcopy = Object.assign({}, state)
      let obj = {
         annuncioId: params.id,
         contenuto: state.inputMessage,
         receiverId: state.msgArray[0]?.insertion?.struttura?.host?.user?.id
      }


      objcopy.msgArray.push(obj);
      // chiamata post API
      if (localStorage.getItem('token') !== null) {
         messageInsertPostApi(obj, getLocalStorage('token'))
            .then(res => {
               messageToSenderIdGetApi(params.id, getLocalStorage("token"))
                  .then(res => {
                     setState({
                        ...state,
                        msgArray: res?.data,
                        inputMessage: ""
                     })
                  })
            }).catch((e) => {
               console.log('errore', e)
            })
      }
   }

   // render chat 
   function renderConversation(mess, key) {
      if (!props.userDuck?.user?.utente?.id) {
         return null;
      }
      if (mess.sender.id !== props.userDuck?.user?.utente?.id) {
         return (

            <div key={key} className={"conversation conversation-host"}>
               <div>{
                  mess.insertion.titolo
               }
               </div>
               <p>{mess.text}</p>
               <div className="dateTimeMessage fsXS fsI">{mess.date_and_time}</div>
            </div>
         )
      } else {

         return (

            <div key={key} className={"conversation conversation-guest"}>
               <div>
                  {t('common.you')}
               </div>
               <p>{mess.text}</p>
               <div className="dateTimeMessage fsXS fsI">{mess.date_and_time}</div>
            </div>
         )
      }
   }

   return (
      <>
         <Helmet>
            <title>SingleConversation</title>
         </Helmet>
         <div className="singleConversation-page flex column w100 oY2">
            <div className="container_messages oY2">
               {
                  state.windowWidth < 992 &&
                  <>
                     <div className='back-button'><GoBackButton /></div>

                     <h1 className='title'>{state.msgArray[0]?.insertion?.descrizione}</h1>
                  </>
               }

               {
                  state.isLoading && <Spin />
               }
               {
                  state.msgArray.map(renderConversation)
               }
               <span ref={myRef}></span>
            </div>


            <div className="space-input fixed b0 l0 w100">
               <Input value={state.inputMessage} onKeyPress={submitMessageOnEnter} onChange={handlerInput} className="send_message_input p1 w100" size="large" placeholder={t('common.writeMessage')} prefix={<FontAwesomeIcon onClick={submitMessageOnSendPress} className="icon_input_message" icon={faPaperPlane} />} />
            </div>
         </div>
      </>
   );
};


const mapStateToProps = (state) => ({
   tokenDuck: state.tokenDuck,
   userDuck: state.userDuck
})

export default connect(mapStateToProps)(React.memo(SingleConversation));

