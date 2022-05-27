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
import { paginationArrowsRender } from "../../../utils/pagination/pagination";

// redux
import { connect } from 'react-redux';

// components
import MessageCard from "../../../components/frontEnd/funcComponents/messageCard/MessageCard";
import GoBackButton from "../../../components/backOffice/hookComponents/goBackButton/GoBackButton";
import { Pagination } from "antd";


class Messages extends Component {
   constructor(props) {
      super(props)
      this.state = {
         windowWidth: window.innerWidth,
         arrayMessages: [],
         page: 1
      }
      this.resize = null;
   }
   componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      if (localStorage.getItem('token') !== null) {
         chatMessagesUserGetApi(getLocalStorage("token"))
            .then(res => {
               if (res?.data !== "") {
                  this.setState({
                     arrayMessages: res?.data?.list
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
      } else {
         this.props.router.navigate(routesDetails.singleConversation(idSender));
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
                  this.state.arrayMessages.length > 0 ?
                     <>
                        {this.state.arrayMessages.map(this.renderMessages)}
                     </> :
                     <h2>{this.props.t('common.emptyChat')} </h2>
               }

               {this.state.arrayMessages.length > 5 &&
                  <Pagination
                     size={"small"}
                     total={10}
                     pageSize={5}
                     current={this.state.page}
                     onChange={this.onPageChange}
                     itemRender={paginationArrowsRender}
                     className={'custom-pagination'}
                  />
               }

            </div>
         </>

      );
   }

};


const mapStateToProps = (state) => ({
   tokenDuck: state.tokenDuck,
   userDuck: state.userDuck
})

export default withTranslation()(withRouting(connect(mapStateToProps)(Messages)));
