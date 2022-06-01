import React, { Component } from "react";

// modules
import { Helmet } from "react-helmet"
import { withTranslation } from "react-i18next";
import withRouting from "../../../withRouting/withRouting";
import { routes, routesDetails } from '../../../routes/routes';

// style
import './profileMenuCSS/Messages.scss';
import '../../../assets/variables/_common.scss';

// api
import { chatMessagesUserGetApi } from '../../../services/api/messaggi/messaggiApi';


// utils
import { getLocalStorage } from "../../../utils/localStorage/localStorage";

// redux
import { connect } from 'react-redux';

// components
import MessageCard from "../../../components/frontEnd/funcComponents/messageCard/MessageCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { Spin } from "antd";
import { myProfilesGetApi } from "../../../services/api/user/userApi";
class Messages extends Component {
   constructor(props) {
      super(props)
      this.state = {
         windowWidth: window.innerWidth,
         arrayMessagesFiltered: [],
         isLoading: true,
         isEmpty: false,
         clickedItem: -1
      }
      this.arrayMessages = []
   }
   componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      if (localStorage.getItem('token') !== null) {
         chatMessagesUserGetApi(getLocalStorage("token"))
            .then(res => {
               if (res?.data !== "") {
                  this.arrayMessages = res?.data?.list;
                  myProfilesGetApi(getLocalStorage("token"))
                     .then((user) => {
                        let id = user?.data?.utente?.id
                        const arrFilter = this.arrayMessages.filter((chat) => {
                           return chat?.lastMessaggio?.insertion?.struttura?.host?.user?.id !== id
                        })
                        this.setState({
                           arrayMessagesFiltered: arrFilter,
                           isLoading: false,
                           isEmpty: false
                        })
                     })
               }
               else {
                  this.setState({
                     isLoading: false,
                     isEmpty: true
                  })
               }
            }).catch((e) => {
               console.log('error', e)
            })
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
      window.removeEventListener('resize', this.handleResize);
   }
   handleResize = () => {
      this.setState({
         windowWidth: window.innerWidth
      })
   }
   // function to render array of chats 
   renderMessages = (mess, key) => {
      let formatDate = new Date(mess.lastMessaggio?.date_and_time)
      return (
         <MessageCard key={key}
            cssCustom={key === this.state.clickedItem ? 'active_chat' : null}
            title={mess.lastMessaggio?.insertion?.descrizione}
            thumbnail={mess.lastMessaggio?.insertion?.struttura?.url_image ? mess.lastMessaggio?.insertion?.struttura?.url_image : 'https://media-cdn.tripadvisor.com/media/photo-s/03/89/c6/20/b-b-il-laghetto.jpg'}
            textMessage={mess.lastMessaggio?.text}
            date={formatDate.toISOString().split('T')[0]}
            callback={this.goToSingleConversation(mess.annuncioId,key)}
         />
      )
   }

   // function to navigate in singleConversation 
   goToSingleConversation = (annuncioId,key) => () => {
      this.setState({clickedItem: key})
      if (this.state.windowWidth < 992) {
         this.props.router.navigate(routesDetails.singleConversationMobile(annuncioId));
      } else {
         this.props.router.navigate(routesDetails.singleConversation(annuncioId));
      }
   }

   onPageChange = (page) => {
      this.setState({
         page: page
      })
   }

   render() {
      return (
         <>
            <Helmet>
               <title>{this.props.t("common.messages")}</title>
            </Helmet>


            <div className='messages-page oY2'>
               {
                  this.state.windowWidth < 992 &&
                  <>
                     <div className='back-button'><GoBackButton /></div>

                     <h1 className='title'>{this.props.t("common.messages")}</h1>
                  </>
               }

               {
                  this.state.arrayMessagesFiltered.map(this.renderMessages)
               }
               {
                  this.state.isEmpty && <h2 className="w">{this.props.t('common.emptyChat')} </h2>

               }
               {
                  this.state.isLoading && <Spin />
               }

            </div>
         </>

      );
   }

};


const mapStateToProps = (state) => ({
   tokenDuck: state.tokenDuck,
})

export default withTranslation()(withRouting(connect(mapStateToProps)(Messages)));
