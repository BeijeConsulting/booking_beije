import React, { Component } from "react";
import withRouting from "../../../withRouting/withRouting";
//HELMET
import { Helmet } from "react-helmet"

//LESS
import './profileMenuCSS/Messages.less'

//TRANSLATIONS
import { t } from "i18next";

//API
import { chatMessagesUserGetApi } from '../../../services/api/messaggi/messaggiApi'

//LOCALSTORAGE
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

//CONNECT
import { connect } from 'react-redux'

import { routes, routesDetails } from '../../../routes/routes'

import MessageCard from "../../../components/frontEnd/funcComponents/messageCard/MessageCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";


class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
      arrayMessages: []
    }
    this.resize = null;
  }
  componentDidMount() {
    this.resize = window.addEventListener('resize', this.handleResize);
    if (localStorage.getItem('token') !== null) {
      chatMessagesUserGetApi('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwLmdub2dub0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCJdLCJpYXQiOjE2NTMzMTA2MTYsImV4cCI6MTY1MzMxNDIxNn0.kaAZeYQzx4zSOHEuuMk0ZN_ijpvHtweWdhr5q8a2kOA')

        .then(res => {

          this.setState({
            arrayMessages: res.data
          })
        })
      //   //chiamataApi per recuperare i messaggi(chat)
      //   // chatMessagesUserGetApi(getLocalStorage("token"))
      //   //.the(res =>{
      //   //   setState({
      //   //     ...state,
      //   //     arrayMessages : res?.data
      //   //   })
      //   // })
    }


  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.windowWidth !== this.state.windowWidth) {
      if (this.state.windowWidth > 991) {
        this.props.router.navigate(routes.CHAT);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    })
  }
  // function to render array of chats 
  renderMessages = (mess, key) => {
    return (
      <MessageCard key={key}
        title={mess.lastMessaggio.insertion.title}
        thumbnail={""}
        textMessage={mess.lastMessaggio.text}
        date={mess.lastMessaggio.date_and_time}
        callback={this.goToSingleConversation(mess.annuncioId)}
      />
    )
  }

  // function to navigate in singleConversation 
  goToSingleConversation = (idSender) => () => {
    if (this.state.windowWidth < 992) {
      this.props.router.navigate(routesDetails.singleConversationMobile(idSender));
      // vector(routesDetails.singleConversationMobile(idSender))
    } else {
      this.props.router.navigate(routesDetails.singleConversation(idSender));

      // vector(routesDetails.singleConversation(idSender))
    }
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{t("common.messages")}</title>
        </Helmet>

        <div className='messages-page'>
          {
            this.state.windowWidth < 992 &&
            <>
              <div className='back-button'><GoBackButton /></div>

              <h1 className='title'>Messages</h1>
            </>
          }

          {this.state.arrayMessages.map(this.renderMessages)}

          <div className="pagination"></div>
        </div>
      </>

    );
  }

};


const mapStateToProps = (state) => ({
  tokenDuck: state.tokenDuck,
  userDuck: state.userDuck
})

export default withRouting(connect(mapStateToProps)(Messages));
