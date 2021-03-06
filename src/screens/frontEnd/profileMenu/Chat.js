import React, { Component } from "react";
import { routes } from "../../../routes/routes";

// components 
import Messages from './Messages';

import withRouting from "../../../withRouting/withRouting";
// scss 
import '../profileMenu/profileMenuCSS/Chat.scss';
import '../../../assets/variables/_common.scss'
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
        window.addEventListener('resize', this.handleResize)
    }
    componentDidUpdate(prevprops, prevstate) {
        if (this.state.windowWidth < 992) {
            this.props.router.navigate(routes.MESSAGES);
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

    render() {
        return (
            <div className="chat">
                <div className="chatContainer flex oY1">
                    <Messages />
                    <Outlet />
                </div>
            </div>
        )
    }

}
export default withRouting(Chat)