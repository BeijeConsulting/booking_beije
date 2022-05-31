import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//TRANSLATION
import { useTranslation } from "react-i18next";

//Style
import "./StructureDetails.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHotel, faPen, faPlus, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Empty, Row, Space } from 'antd';

//ROUTING
import { routes } from "../../../../../routes/routes";
import { Link, useNavigate, useParams } from "react-router-dom";

//Components
import HorizontalCard from './../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';

import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList"

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { getLocalStorage } from "../../../../../utils/localStorage/localStorage";
import Modal from "../../../../../components/common/modal/Modal";

//API
import { showStrutturaById } from "../../../../../services/api/struttura/strutturaApi";
import { annuncioOnStrutturaGetApi } from "../../../../../services/api/annuncio/annuncioApi";

const StructureDetails = (props) => {


    const { t } = useTranslation()
    const navigate = useNavigate()
    const params = useParams();
    const [state, setState] = useState({
        structure: {},
        structureAnnounces: {},
        announceDeleteModal: false,
        loading: {
            structures: true,
            structureAnnounces: true,
        }
    })


    useEffect(() => {
        // console.log(props.userDuck.user.auth) //undefined on mount

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
            structure: structure,
            structureAnnounces: announces
        })
    }

    //CARD LIST
    const goToAnnounce = (idAnnounce = null) => () => {
        navigate(`/${routes.DASHBOARD}/${routes.ANNOUNCE_OPERATION}/${idAnnounce === null ? "new" : idAnnounce}`, {
            state: { idAnnounce: idAnnounce },
        });
    };

    const getAnnounceCards = (announce) => {
        return <HorizontalCard
            key={`${announce?.annuncio?.id}-${randomKey()}`}
            // imageSrc={announce?.annuncio?.img}
            imageAlt={announce?.annuncio?.slug}
            title={announce?.annuncio?.titolo}
            subtitle={<>
                <span className="structure_details__icon">
                    <FontAwesomeIcon icon={faBed} />
                </span>
                {announce?.annuncio?.numPostiLetto}
            </>
            }
            text={announce?.annuncio?.descrizione}
            upperRightContent={
                <>
                    <Modal
                        isOpen={state.announceDeleteModal}
                        callback={handleAnnounceModal}
                    // classNameCustom={"announce_modal"}
                    >
                        <h1>
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {t("bo.screens.host.reservationList.confirmReservationDelete")}
                        </h1>
                        <p>Sei sicuro di voler disativare la strutture, una volta disativata non sara visibile ai clienti di BeijeBnb</p>
                    </Modal>

                    <Link to={routes.ANNOUNCE_OPERATION}>
                        <FontAwesomeIcon className="icon_edit" icon={faPen} />
                    </Link>
                    <button type="button" className="trash_announce_btn" onClick={handleAnnounceModal}>
                        <FontAwesomeIcon className="icon_disable" icon={faTrashCan} />
                    </button>
                </>
            }
            footerContentLeft={
                <strong>
                    €{announce?.annuncio?.prezzo}/{t("bo.screens.host.structureDetails.night")}
                </strong>
            }
            footerContent={
                <span className="announce_count">
                    x{announce?.annuncio?.count}
                </span>
            }
            callback={goToAnnounce(announce?.annuncio?.id)}
        />
    }

    //ANNOUNCE DELETE MODAL
    const handleAnnounceModal = (e) => {
        setState({
            ...state,
            announceDeleteModal: !state.announceDeleteModal,
        })
    }

    const handleOk = (e) => {
        console.log("Ok");
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

            {/* reindirizzare a structureOperations -> edit */}
            <Button className="edit_button" type="primary" >
                <span className="structure_details__icon">
                    <FontAwesomeIcon icon={faPen} />
                </span>
                {t("bo.screens.host.structureDetails.editStructure")}
            </Button>

            <div className="structure_details_container">

                <img className="structure_img" src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />

                <div className="structure_information">
                    <h1>{state.structure?.data?.nome_struttura}</h1>
                    <p>{state.structure?.data?.indirizzo?.citta}, {state.structure?.data?.indirizzo?.stato}</p>
                    <p>
                        <span className="structure_details__icon">
                            <FontAwesomeIcon icon={faHotel} />
                        </span>
                        {state.structure?.data?.tipologiaStrutturaId?.tipo}
                    </p>
                    <p>{state.structure?.data?.descrizione}</p>
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

                {(state.structureAnnounces.status === 204 || state.structureAnnounces?.data?.list.length === 0) ?
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                No announces in this structure yet
                            </span>
                        }
                    >
                        <Button type="primary">
                            <span className="structure_details__icon">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            {t("bo.screens.host.structureDetails.addRoom")}
                        </Button>
                    </Empty>
                    :

                    state.structureAnnounces?.data?.list.map(getAnnounceCards)
                }

            </CardList>
        </>
    )
}

const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck
})

export default connect(mapStateToProps)(StructureDetails);