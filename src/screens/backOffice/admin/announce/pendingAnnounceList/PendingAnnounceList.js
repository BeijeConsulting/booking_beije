import React, { useEffect, useState } from "react";

//REDUX AND TOKEN MANAGEMENT
import { connect } from "react-redux";
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';
import { decryptItem } from "../../../../../utils/crypto/crypto";

//API
import { showPendingAnnouncesGetAllApi, acceptPendingAnnouncesPutApi, declinePendingAnnouncesPutApi } from "../../../../../services/api/annuncio/annuncio-controller/adminAnnouncesApi";


//STYLE
import "./PendingAnnounceList.scss"

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { Button } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";


//TODO: PAGINATION


const PendingAnnounceList = (props) => {

    const [pendingAnnounceList, setPendingAnnounceList] = useState([]);

    const { t } = useTranslation();

    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50, //get from backend
        pageSize: 10, //get from backend
        paginationCallback: switchToPage
    }

    const getAll = async () => {
        let token = getLocalStorage('token')
        let responseApiGetAll = await showPendingAnnouncesGetAllApi(token);
        setPendingAnnounceList(responseApiGetAll.data);
    }

    useEffect(() => {
        getAll();
    }, [])

    //TODO: MANCA "N" per dire quanti annunci accettare/rifiutare + manca anche a video...
    const acceptPendingAnnounce = (clickedAnnounceId) => () => {

        const update = async () => {
            const HEADER = decryptItem(props.tokenDuck.token);
            console.log(acceptPendingAnnouncesPutApi(clickedAnnounceId, HEADER));
            let responseApiPut = await acceptPendingAnnouncesPutApi(clickedAnnounceId);
        }

        update();

        let updated = pendingAnnounceList.filter((structure, index) => {
            return structure.id !== clickedAnnounceId
        })

        setPendingAnnounceList(updated)
    }


    const declinePendingAnnounce = (clickedAnnounceId) => () => {

        const decline = async () => {
            const HEADER = decryptItem(props.tokenDuck.token);
            console.log(declinePendingAnnouncesPutApi(clickedAnnounceId, HEADER));
            let responseApiPutDecline = await declinePendingAnnouncesPutApi(clickedAnnounceId);
        }

        decline();


        let declined = pendingAnnounceList.filter((structure) => {
            return structure.id !== clickedAnnounceId
        })

        setPendingAnnounceList(declined)

    }

    const renderPendingAnnounces = (announce, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            title={announce.nome_struttura}
            text={announce.descrizione}

            footerContent={
                <div className="right">
                    <Button className="pending_button" type="primary" onClick={acceptPendingAnnounce(announce.id)}>{t('common.accept')}</Button>
                    <Button className="pending_button" type="primary" onClick={declinePendingAnnounce(announce.id)}>{t('common.decline')}</Button>
                </div>
            }
        />
    }

    //prendere numero annunci di quel tipo e agiungere bottone per cancellare tot 


    return (
        <>
            <CardList
                sectionTitle={t('bo.screens.admin.pendingAnnounceListTitle')}
                {...paginationProps}
            >
                {pendingAnnounceList.map(renderPendingAnnounces)}
            </CardList>
        </>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});

export default connect(mapStateToProps)(PendingAnnounceList);
