import React, { useEffect, useState } from "react";

//TRANSLATION
import { useTranslation } from "react-i18next";

//REDUX AND TOKEN MANAGEMENT
import { connect } from "react-redux";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";

//API
import { acceptPendingAnnouncesPutApi, declinePendingAnnouncesPutApi, showPendingAnnouncesGetAllApi } from "../../../../../services/api/annuncio/annuncio-controller/adminAnnouncesApi";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';

//STYLE
import "./PendingAnnounceList.scss";
import { Button } from "antd";


//TODO: PAGINATION
//TODO: TEST DECLINE AGAIN, waiting for back-end to fix error 500


const PendingAnnounceList = (props) => {

    const [state, setState] = useState({
        pendingAnnounceList: []
    });

    const { t } = useTranslation();

    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50, //get from backend
        pageSize: 10, //get from backend --> state.lastPage
        paginationCallback: switchToPage
    }


    const getAll = async () => {

        let responseApiGetAll = null;

        if (localStorage.getItem('token') !== null) {
            let token = getLocalStorage('token')
            responseApiGetAll = await showPendingAnnouncesGetAllApi(token);
        }

        setState({
            ...state,
            pendingAnnounceList: responseApiGetAll.data.list
        });
    }

    useEffect(() => {
        getAll();
    }, [])


    const acceptPendingAnnounce = (clickedAnnounceId) => () => {

        const update = async () => {

            //TODO: const HEADER = decryptItem(props.tokenDuck.token);
            if (localStorage.getItem('token') !== null) {
                const HEADER = getLocalStorage('token');

                let n = state.pendingAnnounceList.find((announce) => announce.id === clickedAnnounceId).count;

                acceptPendingAnnouncesPutApi(clickedAnnounceId, HEADER, n);
            }
        }

        update();

        let updated = state.pendingAnnounceList.filter((announce, index) => {
            return announce.id !== clickedAnnounceId
        })

        setState({
            ...state,
            pendingAnnounceList: updated
        })

    }


    const declinePendingAnnounce = (clickedAnnounceId) => () => {

        const decline = async () => {

            if (localStorage.getItem('token') !== null) {

                //TODO: const HEADER = decryptItem(props.tokenDuck.token);
                const HEADER = getLocalStorage('token');

                let n = state.pendingAnnounceList.find((announce) => announce.id === clickedAnnounceId).count;

                declinePendingAnnouncesPutApi(clickedAnnounceId, HEADER, n);
            }
        }

        decline();


        let declined = state.pendingAnnounceList.filter((structure) => {
            return structure.id !== clickedAnnounceId
        })

        setState({
            ...state,
            pendingAnnounceList: declined
        })

    }

    const renderPendingAnnounces = (announce, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            title={announce.nome_struttura}
            text={announce.descrizione}

            footerContent={
                <>
                    <Button className="pending_button" type="primary" onClick={acceptPendingAnnounce(announce.id)}>{t('common.accept')}</Button>
                    <Button className="pending_button" type="primary" onClick={declinePendingAnnounce(announce.id)}>{t('common.decline')}</Button>
                </>
            }

        />
    }


    return (
        <>
            <CardList
                sectionTitle={t('bo.screens.admin.pendingAnnounceListTitle')}
                {...paginationProps}
            >
                {state.pendingAnnounceList.map(renderPendingAnnounces)}
            </CardList>
        </>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});

export default connect(mapStateToProps)(PendingAnnounceList);
