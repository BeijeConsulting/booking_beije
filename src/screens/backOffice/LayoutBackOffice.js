import React, { useState } from 'react';
import { Layout } from 'antd';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faPen } from '@fortawesome/free-solid-svg-icons';

import Sidebar from '../../components/backOffice/functionalComponent/sidebar/Sidebar';

import { Outlet } from 'react-router-dom';
import Footer from '../../components/frontEnd/hookComponents/footer/Footer';
//UTILS
import { LinksFooterHost } from '../../utils/linksFooter/linksFooter';

const { Header, Sider, Content } = Layout;


const LayoutBackOffice = () => {

    const [state, setState] = useState({
        collapsed: false
    })

    const toggleSidebar = () => {
        setState({
            ...state,
            collapsed: !state.collapsed,
        });
    };

    return (
        <Layout>
            <Sider trigger={null} collapsed={state.collapsed} collapsible>
                <Sidebar />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {state.collapsed ? <FontAwesomeIcon icon={faPen} className={'trigger'}
                        onClick={toggleSidebar} inverse /> : <FontAwesomeIcon icon={faHotel} className={'trigger'}
                            onClick={toggleSidebar} inverse />
                    }
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        height: "90vh",
                        overflowY: "scroll"
                    }}
                >
                    <Outlet />
                </Content>

                <Footer link={LinksFooterHost} />
            </Layout>
        </Layout>
    );
}

export default LayoutBackOffice;