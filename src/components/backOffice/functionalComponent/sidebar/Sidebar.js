import React from "react"

//ANT Design
import { Menu } from "antd"

//TRANSLATION
import { useTranslation } from "react-i18next";

//Font-Awesome
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faWallet, faBookOpen, faMessage } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    const { t } = useTranslation()
    return (
        <>
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
                        label: t("bo.components.sidebar.structure"),
                    },
                    {
                        key: '2',
                        icon: <FontAwesomeIcon icon={faWallet} />,
                        label: t("bo.components.sidebar.payments"),
                    },
                    {
                        key: '3',
                        icon: <FontAwesomeIcon icon={faBookOpen} />,
                        label: t("common.bookings"),
                    },
                    {
                        key: '4',
                        icon: <FontAwesomeIcon icon={faMessage} />,
                        label: t("common.messages"),
                    }
                ]}
            />
        </>)
}

export default Sidebar