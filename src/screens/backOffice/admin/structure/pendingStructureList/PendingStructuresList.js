import React, { useEffect, useState } from "react";

//TRANSLATION
import { useTranslation } from "react-i18next";

//REDUX AND TOKEN MANAGEMENT
import { connect } from "react-redux";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";

//API
import { acceptPendingStructurePutApi, declinePendingStructurePutApi, showPendingStructuresGetAllApi } from "../../../../../services/api/struttura/struttura-controller/adminStructuresApi";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';

//STYLE
import "./PendingStructuresList.scss";
import { Button } from "antd";


//TODO: PAGINATION
//TODO: TEST DECLINE AGAIN, waiting for back-end to fix error 500


const PendingStructuresList = (props) => {

    const [state, setState] = useState({
        pendingStructureList: []
    });

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

        let responseApiGetAll = null;

        if (localStorage.getItem('token') !== null) {
            let token = getLocalStorage('token');
            responseApiGetAll = await showPendingStructuresGetAllApi(token);
        }

        setState({
            ...state,
            pendingStructureList: responseApiGetAll.data.list
        });
    }

    useEffect(() => {
        getAll();
    }, [])

    const acceptPendingStructure = (clickedStructureId) => () => {

        const update = async () => {
            if (localStorage.getItem('token') !== null) {

                //TODO: const HEADER = decryptItem(props.tokenDuck.token);
                const HEADER = getLocalStorage('token');

                acceptPendingStructurePutApi(clickedStructureId, HEADER);
            }
        }

        update();

        let updated = state.pendingStructureList.filter((structure) => {
            return structure.id !== clickedStructureId
        })

        setState({
            ...state,
            pendingStructureList: updated
        })

    }


    const declinePendingStructure = (clickedStructureId) => () => {

        const decline = async () => {

            if (localStorage.getItem('token') !== null) {

                //TODO: const HEADER = decryptItem(props.tokenDuck.token);
                const HEADER = getLocalStorage('token');

                declinePendingStructurePutApi(clickedStructureId, HEADER);
            }
        }

        decline();


        let declined = state.pendingStructureList.filter((structure) => {
            return structure.id !== clickedStructureId
        })

        setState({
            ...state,
            pendingStructureList: declined
        })

    }

    const renderPendingStructures = (structure, key) => {


        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            title={structure.nome_struttura}
            text={structure.descrizione}

            footerContent={
                <>
                    <Button className="pending_button" onClick={acceptPendingStructure(structure.id)} type="primary">{t('common.accept')}</Button>
                    <Button className="pending_button" onClick={declinePendingStructure(structure.id)} type="primary">{t('common.decline')}</Button>
                </>
            }
        />
    }


    return (
        <>
            <CardList
                sectionTitle={"Pending structures list"}
                {...paginationProps}
            >
                {state.pendingStructureList.map(renderPendingStructures)}
            </CardList>
        </>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});

export default connect(mapStateToProps)(PendingStructuresList);