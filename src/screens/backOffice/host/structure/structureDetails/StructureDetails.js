import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//TRANSLATION
import { useTranslation } from "react-i18next";

//Style
import "./StructureDetails.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHotel, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Carousel, Empty, Spin } from 'antd';

//ROUTING
import { routes } from "../../../../../routes/routes";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

//Components
import HorizontalCard from './../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';

import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList"

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { getLocalStorage } from "../../../../../utils/localStorage/localStorage";
// import Modal from "../../../../../components/common/modal/Modal";

//API
import { showStrutturaById } from "../../../../../services/api/struttura/strutturaApi";
import { annuncioOnStrutturaGetApi, pendingAnnunciOnStruttura } from "../../../../../services/api/annuncio/annuncioApi";
import ChoiceButton from "../../../../../components/backOffice/hookComponents/choiceButton/ChoiceButton";


let token = null;

const StructureDetails = (props) => {


    const { t } = useTranslation()
    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [state, setState] = useState({
        structure: {},
        structureAnnounces: {},
        loading: {
            structures: true,
            structureAnnounces: true,
            // deleteAnnounces: false, //not implemented
        },
        modalDelete: {
            trigger: false,
        },
        pagination: {
            count: 1,
            itemsPerPage: 3,
            currentPage: 1,
        }
    })


    useEffect(() => {
        // console.log(props.userDuck.user.auth) //undefined on mount

        if (localStorage.getItem('token') !== null) {
            token = getLocalStorage('token');

            const currentPage = searchParams.get("page") ?? state.pagination.currentPage
            fetchOnMount(params.id, currentPage, state.pagination.itemsPerPage, token)
        } else {
            navigate(routes.LOGIN)
        }

    }, [])

    //fetch announces based on query
    useEffect(() => {

        if (state.structure.data === undefined) {
            return
        }

        console.log('update SearchParams!');
        const currentPage = searchParams.get("page") ?? state.pagination.currentPage
        fetchAnnouncesBasedOnQueryParam(state.structure?.data?.id, currentPage, state.pagination.itemsPerPage, token);

    }, [searchParams])

    //APIS
    const fetchOnMount = async (id, currentPage, itemsPerPage, token) => {

        const structure = await showStrutturaById(id, token)
        // const announces = await annuncioOnStrutturaGetApi(structure?.data?.id)
        let announces;
        const announceQuery = searchParams.get("show-announces")

        if (announceQuery === "pending") {
            // console.log("pending!")
            announces = await pendingAnnunciOnStruttura(id, currentPage, itemsPerPage, token)
        } else {
            // console.log("null!")
            announces = await annuncioOnStrutturaGetApi(id, currentPage, itemsPerPage)
        }

        console.log(structure)
        console.log(announces)

        setState({
            ...state,
            structure: structure,
            structureAnnounces: announces,
            loading: {
                structures: false,
                structureAnnounces: false,
            },
            pagination: {
                ...state.pagination,
                count: announces?.data?.elementsTotal ?? 1,
                currentPage: announces?.data?.page,
            }
        })
    }

    const fetchAnnouncesBasedOnQueryParam = async (id, currentPage, itemsPerPage, token) => {
        const announcePendingQuery = searchParams.get("show-announces");
        let announces;

        if (announcePendingQuery === "pending") {
            // console.log("pending!")
            announces = await pendingAnnunciOnStruttura(id, currentPage, itemsPerPage, token)
        } else {
            // console.log("null!")
            announces = await annuncioOnStrutturaGetApi(id, currentPage, itemsPerPage)
        }

        setState({
            ...state,
            structureAnnounces: announces,
            loading: {
                structureAnnounces: false,
            },
            pagination: {
                ...state.pagination,
                count: announces?.data?.elementsTotal ?? 1,
                currentPage: announces?.data?.page,
            }
        })
    }

    //NAVIGATION
    const goToEditStructure = (idStructure) => () => {
        console.log(idStructure)
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/${idStructure}`, {
            state: { idStructure: idStructure },
        })
    }

    const goToAnnounce = (idAnnounce = null) => () => {
        //this should take you to frontend page
        navigate(`/${routes.DASHBOARD}/${routes.ANNOUNCE_OPERATION}/${idAnnounce === null ? "new" : idAnnounce}`, {
            state: { idAnnounce: idAnnounce },
        });
    };


    const showAcceptedAnnounces = () => {
        navigate(`${location.pathname}`)
        setState({
            ...state,
            loading: {
                structureAnnounces: true,
            }
        })
    };
    const showPendingAnnounces = async () => {
        navigate(`${location.pathname}?show-announces=pending`)
        setState({
            ...state,
            loading: {
                structureAnnounces: true,
            }
        })
    };

    //CARD LIST
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
                    <button type="button" className="action_btn edit_btn" onClick={goToAnnounce(announce?.annuncio?.id)}>
                        <FontAwesomeIcon className="icon_edit" icon={faPen} />
                    </button>

                    {/* <button type="button" className="action_btn trash_btn" onClick={triggerAnnouceDeleteModal(announce?.annuncio)}>
                        <FontAwesomeIcon className="icon_disable" icon={faTrashCan} />
                    </button> */}
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
    {/*   const triggerAnnouceDeleteModal = (announceData) => (e) => {
        console.log(announceData)
        let modalState = {
            ...state,
            modalDelete: {
                trigger: !state.modalDelete.trigger,
                announceId: announceData?.id,
                announceTitle: announceData?.titolo,
                announceCount: announceData?.count,
                inputValue: announceData?.count,
            }
        }

        if (state.modalDelete.trigger) {
            modalState = {
                ...state,
                modalDelete: {
                    trigger: !state.modalDelete.trigger,
                }
            }
        }
        setState(modalState)
    }

   const onChangeInputDeleteAnnounceCount = (inputValue) => {
        setState({
            ...state,
            modalDelete: {
                ...state.modalDelete,
                inputValue: inputValue
            }
        })

        console.log(inputValue);
    }

      const onDeleteAnnounces = (e) => {
        console.log("Delete", "id:" + state.modalDelete.announceId);
    } */}


    //PAGINATION
    const switchToPage = (clickedPage) => {
        console.log("switch to page", clickedPage);
        //set paginationProps.currentPage to clickedPage (with useState)
        setSearchParams({ page: clickedPage })
        /* setState({
            ...state,
            pagination: {
                ...state.pagination,
                currentPage: clickedPage,
            }
        }) */
        //remap new object's array from API
    }

    const paginationProps = {
        itemsCount: state.pagination.count,
        pageSize: state.pagination.itemsPerPage,
        paginationCallback: switchToPage
    }

    return (
        <>
            <h1 className="page_title">
                {t("bo.screens.host.structureDetails.structureDetailsTitle")}
            </h1>

            {state.loading.structures ?
                <Spin />
                :
                <>
                    <Button className="edit_button" type="primary" onClick={goToEditStructure(state.structure?.data?.id)} >
                        <span className="structure_details__icon">
                            <FontAwesomeIcon icon={faPen} />
                        </span>
                        {t("bo.screens.host.structureDetails.editStructure")}
                    </Button>

                    <div className="structure_details_container">

                        <Carousel>
                            {state.structure?.data?.images.map(renderCarouselImages)}
                        </Carousel>

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
                </>
            }

            <CardList
                sectionTitle="Annunci"
                actions={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <ChoiceButton
                                callbackFirstButton={showAcceptedAnnounces}
                                firstButtonName={t("bo.screens.host.reservationList.accepted")}
                                callbackSecondButton={showPendingAnnounces}
                                secondButtonName={t("common.pending")}
                            />
                        </div>
                        <div>
                            <Button type="primary" onClick={goToAnnounce()}>
                                <span className="structure_details__icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                                {t("bo.screens.host.structureDetails.addRoom")}
                            </Button>
                        </div>
                    </div>
                }
                {...paginationProps}>

                {state.loading.structureAnnounces ?
                    <Spin />
                    :
                    (state.structureAnnounces?.status === 204 || state.structureAnnounces?.data?.list.length === 0) ?
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 60,
                            }}
                            description={
                                <span>
                                    {t("bo.screens.host.structureDetails.emptyAnnounces")}
                                </span>
                            }
                        >
                            <Button type="primary" onClick={goToAnnounce()}>
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

            {/* Delete announces modal - NOT IMPLEMENTED IN BACKEND */}
            {/* <Modal
                title={`Delete ${state.modalDelete.announceTitle}?`}
                cancelText={"ANNULLA"}
                okText={"CANCELLA ANNUNCIO"}
                visible={state.modalDelete.trigger}
                onOk={onDeleteAnnounces}
                confirmLoading={state.loading.deleteAnnounces}
                onCancel={triggerAnnouceDeleteModal()}
            >
                <p>Change with translation</p>

                <InputNumber
                    min={1}
                    max={state.modalDelete.announceCount}
                    value={state.modalDelete.inputValue}
                    onChange={onChangeInputDeleteAnnounceCount}
                    keyboard
                />
            </Modal> */}
        </>
    )
}
const renderCarouselImages = (img, key) => {
    return <div key={`structure-img-${key}`}>
        <img src={img.urlImage} className="carousel_img" alt={`structure image n.${key}`} />
    </div>
}


const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck
})

export default connect(mapStateToProps)(StructureDetails);