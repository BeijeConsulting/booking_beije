import React from "react";
import PropTypes from "prop-types"

//STYLE
import "./Sidebar.less"
import { Link } from "react-router-dom";

//ICON
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

//COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => {
    return (
        <aside>
            <div className="sidebar_container">
                <div className="sidebar_logo">
                    <img src={props.profileImg} alt="profile_img" />
                    <h3>Beije BNB</h3>
                </div>
                <div className="sidebar_section active">Structure</div>
                <div className="sidebar_section">Payments</div>
                <div className="sidebar_section">Reservations</div>
                <div className="sidebar_section">Messages</div>
            </div>
            <Link to="" ><FontAwesomeIcon icon={faArrowRightToBracket} /> Go to guest mode</Link>
        </aside>
    )
}

Sidebar.defaultProp = {
    profileImg: ""
}

Sidebar.propTypes = {
    profileImg: PropTypes.string
}

export default Sidebar;