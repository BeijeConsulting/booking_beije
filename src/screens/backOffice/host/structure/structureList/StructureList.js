import React, { useState, useEffect } from 'react';

//STYLE
import "./StructureList.scss";

//FONT-AWESOM
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPen,
    faTrashCan,
    faTriangleExclamation,
    faHotel,
    faApartment,
    faHouse
} from '@fortawesome/free-solid-svg-icons'

//TRANSLATION
import { useTranslation } from "react-i18next";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import { Button, Rate, Spin } from "antd";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import Modal from "antd/lib/modal/Modal";

import { useNavigate } from "react-router-dom";
import { routes } from "../../../../../routes/routes";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";

import {
    disableStrutturaPutApi,
    showAllStruttureGetApi,
    showAllStruttureGetApiPagination
} from '../../../../../services/api/struttura/strutturaApi'


//TODO: manca get da backend
//TODO: manca navigate che al click sulla singola struttura la passa come oggetto a StructureDetails

const StructureList = () => {


    const { t } = useTranslation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: true,
        structureListData: [],
        lastPage: null,
        isModalVisible: false
    })

    const fetchingStructureList = async () => {
        let allStructure = await showAllStruttureGetApi()
        setState({
            ...state,
            loading: false,
            structureListData: allStructure?.data.list,
            lastPage: allStructure?.data.lastPage,
            curentPage: allStructure?.data.page
        })
    }

    //DISABLE STRUCTURE
    const handleOk = () => {
        setState({
            ...state,
            isModalVisible: false
        })
    }

    const disableStructure = (id) => async () => {
        let disableStructureApi = await disableStrutturaPutApi(id, { esito: false }, "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwLmdub2dub0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVU0VSIiwiSE9TVCJdLCJpYXQiOjE2NTM1Njk3MTksImV4cCI6MTY1MzU3MzMxOX0.Pp0rqFjN61qZ-S9yngBTWG1yCXYZGkbTpMREU93UYeI")

        console.log(id)
        console.log(disableStructureApi)
        setState({
            ...state,
            isModalVisible: true
        })
    }

    //GO TO STRUCTURE DETAILS
    const goToStructureDetails = (idStructure) => () => {
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_LIST}/${idStructure}`);
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
                // callback={goToStructureDetails(structure.id)}
                imageSrc={structure.url_image}
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
        let dataPaginationStructure = await showAllStruttureGetApiPagination(`?page=${clickedPage}&_itemsPerPage=2`)

        console.log(dataPaginationStructure)
        setState({
            structureListData: dataPaginationStructure?.data.list,
            lastPage: dataPaginationStructure?.data.lastPage
        })
    }

    //PAGINATION PROPS
    const paginationProps = {
        itemsCount: 50, //get from backend
        pageSize: state.lastPage, //get from backend
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
            {!state.loading ? state.structureListData.map(getCardStructures) : <Spin />}
        </CardList>
    );
}

export default StructureList;