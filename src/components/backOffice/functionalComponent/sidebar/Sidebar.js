import React from "react"

//ANT Design
import { Menu } from "antd"

//Font-Awesome
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faWallet, faBookOpen, faMessage } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    return (<>
        <div className="logo" />
        <div>
            {/* <img src={props.profileImg} alt="profile_img" /> */}
            <h3>Beije BNB</h3>
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <FontAwesomeIcon icon={faHotel} />,
                    label: 'Structure',
                },
                {
                    key: '2',
                    icon: <FontAwesomeIcon icon={faWallet} />,
                    label: 'Payments',
                },
                {
                    key: '3',
                    icon: <FontAwesomeIcon icon={faBookOpen} />,
                    label: 'Reservations',
                },
                {
                    key: '4',
                    icon: <FontAwesomeIcon icon={faMessage} />,
                    label: 'Messages',
                }
            ]}
        />
    </>)
}

export default Sidebar