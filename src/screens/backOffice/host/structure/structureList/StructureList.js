import React, { useState, useEffect } from 'react';

//STYLE
import "./StructureList.scss";

//FONT-AWESOM
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faTrashCan,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'

//TRANSLATION
import { useTranslation } from "react-i18next";

//REDUX
import { connect } from 'react-redux'

//FUNCTION UTILS
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';
// import { decryptItem } from '../../../../../utils/crypto/crypto';

//COMPONENTS
import { Button, Rate, Spin } from "antd";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import Modal from "antd/lib/modal/Modal";
import { routes, routesDetails } from "../../../../../routes/routes";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";

import { useNavigate } from "react-router-dom";

import { setLocalStorage } from '../../../../../utils/localStorage/localStorage';



import {
    disableStrutturaPutApi,
    showHostStruttureGetApi
} from '../../../../../services/api/struttura/strutturaApi'

//TODO: manca navigate che al click sulla singola struttura la passa come oggetto a StructureDetails

const StructureList = (props) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: true,
        structureListData: [],
        elementsTotal: 1,
        isModalVisible: false
    })

    //FETCHING LIST OF STRUCTURE
    const fetchingStructureList = async () => {

        if (localStorage.getItem('token') !== null) {
            try {
                const HEADER = getLocalStorage("token")
                let allStructure = await showHostStruttureGetApi(1, 3, HEADER)

                setState({
                    ...state,
                    loading: false,
                    structureListData: allStructure?.data.list,
                    elementsTotal: allStructure?.data.elementsTotal
                })
            }
            catch {
                setState({
                    ...state,
                    loading: false
                })
            }
        }


    }


    //DISABLE STRUCTURE
    const handleOk = () => {
        setState({
            ...state,
            isModalVisible: false
        })
    }

    const disableStructure = (id) => async () => {
        const HEADER = getLocalStorage("token")
        let disableStructureApi = await disableStrutturaPutApi(id, { esito: true }, HEADER)
        console.log(disableStructureApi)

        setState({
            ...state,
            isModalVisible: true
        })
    }

    //GO TO STRUCTURE DETAILS
    const goToStructureDetails = (idStructure) => () => {
        navigate(`/${routes.DASHBOARD}/${routesDetails.detailStructureHost(idStructure)}`);
    }

    //GO TO ADD STRUCTURE
    const goToAddEditStructure =
        (idStructure = null) =>
            () => {
                navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/${idStructure === null ? "new" : idStructure}`, {
                    state: { idStructure: idStructure },
                });
            };

    //RENDER FUNCTION OF STRUCTUR LIST
    const getCardStructures = (structure, key) => {
        return (
            <HorizontalCard
                key={`${key}-${randomKey()}`}
                callback={goToStructureDetails(structure.id)}
                imageSrc={structure.images.length > 0 ? structure.images[0]['urlImage'] : ''}
                altText={`${key}_${structure}`}
                title={structure.nome_struttura}
                text={
                    <>
                        <span>{!structure.indirizzo ? 'Some city' : structure.indirizzo.citta}, </span>
                        <span>{!structure.indirizzo ? 'Some country' : structure.indirizzo.stato}</span>
                        <p>{!structure.tipologiaStrutturaId ? 'Structure' : structure.tipologiaStrutturaId.tipo}</p>
                    </>
                }
                footerContent={
                    <div className="rate_container">
                        <div>
                            <Rate className="rate_item" disabled defaultValue={structure.media_recensioni} />
                            <span>{structure.media_recensioni}</span>
                            <span>({structure.numero_recensioni})</span>
                        </div>
                    </div>
                }
                upperRightContent={
                    <>
                        <Modal visible={state.isModalVisible} onOk={handleOk} onCancel={handleCancel} forceRender={true}>
                            <h1>
                                <FontAwesomeIcon icon={faTriangleExclamation} /> {t("bo.screens.host.reservationList.confirmReservationDelete")}
                            </h1>
                            <p>Sei sicuro di voler disativare la struture, una volta disativata non sara visibile ai clienti di BeijeBnb</p>
                        </Modal>
                        <FontAwesomeIcon onClick={goToAddEditStructure(structure.id)} className="icon_edit" icon={faPen} />
                        <FontAwesomeIcon onClick={disableStructure(structure.id)} className="icon_disable" icon={faTrashCan} />
                    </>
                }
            />
        );
    };

    //CHANGE PAGE(PAGINATION)
    const switchToPage = async (clickedPage) => {
        const HEADER = getLocalStorage("token")
        let dataPaginationStructure = await showHostStruttureGetApi(clickedPage, 3, HEADER)
        setState({
            ...state,
            structureListData: dataPaginationStructure?.data.list,
            elementsTotal: dataPaginationStructure?.data.elementsTotal
        })
    }

    //PAGINATION PROPS
    const paginationProps = {
        itemsCount: state.elementsTotal, //get from backend
        pageSize: 3, //get from backend
        paginationCallback: switchToPage
    }

    //RJECTED DISATIVATION 
    const handleCancel = () => {
        setState({
            ...state,
            isModalVisible: false
        })
    }

    useEffect(() => {
        fetchingStructureList()
    }, [])

    return (
        <CardList
            sectionTitle={t("bo.screens.host.structure.structureListTitle")}
            actions={
                <Button onClick={goToAddEditStructure(null)} type="primary">
                    {t("bo.screens.host.structure.addStructure")}
                </Button>
            }
            {...paginationProps}
        >
            {!state.loading ? state.structureListData.map(getCardStructures) : <><Spin /><p>Non ci sono struture...</p></>}
        </CardList>
    );
}
const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck
});


export default connect(mapStateToProps)(StructureList);