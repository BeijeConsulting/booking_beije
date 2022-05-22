// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { routes } from "../../../routes/routes";

// import Messages from './Messages';
// import SingleConversation from './SingleConversation'

// // less 
// import '../profileMenu/profileMenuCSS/Chat.less'
// const Chat = (props) => {
//     const vector = useNavigate()
//     const [state, setState] = useState({
// windowWidth: window.innerWidth,
// idAnnouncement: undefined,
// arrayOfChats: []
//     })
//     useEffect(() => {
//         if (state.windowWidth < 992) {
//             return vector(routes.LAYOUT)
//         }

// chiamataApi per recuperare i messaggi(chat)
// messageToSenderIdGetApi(getLocalStorage("token"))
//     .then(res => {
//         setState({
//             ...state,
//             arrayOfChats: res?.data
//         })
//     })

//         //da cancellare quando api ok
//         let chatsTest = [{
//             idSender: 21,
//             senderName: 'samualeSPA',
//             senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
//             lastMessage: {
//                 description: 'Lorem it congue,',
//                 date: "2022-08-20",
//                 time: "00:00:00"
//             },
//         }]
//         if (state.arrayOfChats === chatsTest) {
//             console.log(state.arrayOfChats)
//             console.log(chatsTest)


//         }

// function handleResize() {
//     setState({
//         ...state,
//         windowWidth: window.innerWidth
//     })
// }
//         window.addEventListener('resize', handleResize)
//         return () => { window.removeEventListener('resize', handleResize) }
//     })
// const renderSingleConversation = (idSender) => {
//     setState({
//         ...state,
//         idAnnouncement: idSender
//     })
// }
//     return (
// <div className="chat">
//     <div className="chatContainer">
//         <Messages callback={renderSingleConversation} arrayOfChats={state.arrayOfChats} />
//         <SingleConversation idAnnouncementClicked={state.idAnnouncement} />
//     </div>
// </div>
//     )
// }

// export default Chat

import React, { Component } from "react";
import { routes,routesDetails } from "../../../routes/routes";

import Messages from './Messages';
import SingleConversation from './SingleConversation'

import withRouting from "../../../withRouting/withRouting";
// less 
import '../profileMenu/profileMenuCSS/Chat.less';
import { Outlet } from "react-router";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowWidth: window.innerWidth,
            idAnnouncement: undefined,
            arrayOfChats: []
        }
    }
    componentDidMount() {
        console.log('mount')

        //chiamataApi per recuperare i messaggi(chat)
        // messageToSenderIdGetApi(getLocalStorage("token"))
        //     .then(res => {
        //         setState({
        //             ...state,
        //             arrayOfChats: res?.data
        //         })
        //     })
        
        window.addEventListener('resize', this.handleResize)


    }
    componentDidUpdate(prevprops,prevstate) {
        if(prevstate.arrayOfChats !== this.state.arrayOfChats){
            this.setState({
                arrayOfChats: [{
                    idSender: 21,
                    senderName: 'samualeSPA',
                    senderProfileIcon: 'https://www.veneto.info/wp-content/uploads/sites/114/chioggia.jpg',
                    lastMessage: {
                        description: 'Lorem it congue,',
                        date: "2022-08-20",
                        time: "00:00:00"
                    },
                }]
            })
        }
        
        if (this.state.windowWidth < 992) {
            this.props.router.navigate(routes.LAYOUT);
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
    renderSingleConversation = (idSender) => {
        this.props.router.navigate(routesDetails.singleConversation(idSender));

        // this.setState({
        //     idAnnouncement: idSender
        // })
    }
    render() {
        return (
            <div className="chat">
                <div className="chatContainer">
                    <Messages callback={this.renderSingleConversation} arrayOfChats={this.state.arrayOfChats} />
                    <Outlet />
                    {/* <SingleConversation idAnnouncementClicked={this.state.idAnnouncement} /> */}
                </div>
            </div>
        )
    }

}
export default withRouting(Chat)