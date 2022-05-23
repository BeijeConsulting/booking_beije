import React, { Component } from "react";
import { routes,routesDetails } from "../../../routes/routes";

// components 
import Messages from './Messages';

import withRouting from "../../../withRouting/withRouting";
// less 
import '../profileMenu/profileMenuCSS/Chat.less';
import { Outlet } from "react-router";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowWidth: window.innerWidth,
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