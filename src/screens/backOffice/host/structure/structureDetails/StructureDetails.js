import React, { useEffect, useState } from "react";

//TRANSLATION
import { useTranslation } from "react-i18next";

//Style
import "./StructureDetails.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHotel, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row, Space } from 'antd';

//ROUTING
import { routes } from "../../../../../routes/routes";
import { Link, useNavigate, useParams } from "react-router-dom";

//Components
import HorizontalCard from './../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';

// import Sidebar from "../../../../../components/backOffice/functionalComponent/sidebar/Sidebar";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList"

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { getLocalStorage } from "../../../../../utils/localStorage/localStorage";

//API
import { showStrutturaById } from "../../../../../services/api/struttura/strutturaApi";
import { annuncioOnStrutturaGetApi } from "../../../../../services/api/annuncio/annuncioApi";

const StructureDetails = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const params = useParams();
    const [state, setState] = useState({
        structure: {},
        structureAnnounces: [],
        announceDeleteModal: false,
        loading: {

        }
    })

    useEffect(() => {
        // should use redux stored token when ready!!!
        if (localStorage.getItem('token') !== null) {
            const token = getLocalStorage('token');

            fetchOnMount(params.id, token)
        }
    }, [])

    //APIS
    const fetchOnMount = async (id, token) => {

        const structure = await showStrutturaById(id, token)
        const announces = await annuncioOnStrutturaGetApi(structure?.data?.id)

        console.log(structure)
        console.log(announces)

        setState({
            ...state,
            structure: structure?.data,
            structureAnnounces: announces?.data?.list
        })
    }




    //CARD LIST
    const goToAnnounce = (idAnnounce = null) => () => {
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/${idAnnounce === null ? "new" : idAnnounce}`, {
            state: { idAnnounce: idAnnounce },
        });

    };

    const getAnnounceCards = (announce) => {
        return <HorizontalCard
            key={`${announce.id}-${randomKey()}`}
            // imageSrc={announce.img}
            imageAlt={announce?.slug}
            title={announce?.titolo}
            subtitle={<>
                <span className="structure_details__icon">
                    <FontAwesomeIcon icon={faBed} />
                </span>
                {announce?.numPostiLetto}
            </>
            }
            text={announce?.descrizione}
            upperRightContent={
                <>
                    {/* <Modal visible={state.isModalVisible} onOk={handleOk} onCancel={handleCancel} forceRender={true}>
                        <h1>
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {t("bo.screens.host.reservationList.confirmReservationDelete")}
                        </h1>
                        <p>Sei sicuro di voler disativare la strutture, una volta disativata non sara visibile ai clienti di BeijeBnb</p>
                    </Modal> */}
                    <Link to={routes.ANNOUNCE_OPERATION}>
                        <FontAwesomeIcon className="icon_edit" icon={faPen} />
                    </Link>
                    <button type="button" className="trash_announce_btn" onClick={announceDeleteModal}>
                        <FontAwesomeIcon className="icon_disable" icon={faTrashCan} />
                    </button>
                </>
            }
            footerContentLeft={<strong>€{announce?.prezzo}/night</strong>}
            footerContent={
                <span className="announce_count">
                    x{announce.count}
                </span>
            }
            callback={goToAnnounce(announce.id)}
        />
    }

    const announceDeleteModal = (e) => {
        setState({
            ...state,
            announceDeleteModal: true,
        })
    }

    //PAGINATION
    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)

        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: 50,
        pageSize: 10,
        paginationCallback: switchToPage
    }

    return (
        <>

            <h1 className="page_title">
                {t("bo.screens.host.structureDetails.structureDetailsTitle")}
            </h1>

            <Row>
                <Col offset={21}>
                    <Button className="edit_button" type="primary" >
                        <span className="structure_details__icon">
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        {t("bo.screens.host.structureDetails.editStructure")}
                    </Button>
                </Col>
            </Row>

            <div className="structure_details_container">

                <img className="structure_img" src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />

                <div className="structure_information">
                    <h1>{state.structure?.nome_struttura}</h1>
                    <p>{state.structure?.indirizzo?.citta}, {state.structure?.indirizzo?.stato}</p>
                    <p>
                        <span className="structure_details__icon">
                            <FontAwesomeIcon icon={faHotel} />
                        </span>
                        {state.structure?.tipologiaStrutturaId?.tipo}
                    </p>
                    <p>{state.structure?.descrizione}</p>
                </div>

            </div>

            <CardList
                sectionTitle="Annunci"
                actions={<Button type="primary">
                    <span className="structure_details__icon">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    {t("bo.screens.host.structureDetails.addRoom")}
                </Button>}
                {...paginationProps}>
                {
                    state.structureAnnounces.map(getAnnounceCards)
                }
            </CardList>
        </>
    )
}

export default StructureDetails;