import React, { useEffect, useState } from "react";

//REDUX AND TOKEN MANAGEMENT
import { connect } from "react-redux";
import { getLocalStorage } from '../../../../../utils/localStorage/localStorage';
import { decryptItem } from "../../../../../utils/crypto/crypto";

//API
import { showPendingStructuresGetAllApi } from "../../../../../services/api/struttura/struttura-controller/adminStructuresApi";
import { acceptPendingStructurePutApi } from '../../../../../services/api/struttura/struttura-controller/adminStructuresApi';
import { declinePendingStructurePutApi } from '../../../../../services/api/struttura/struttura-controller/adminStructuresApi';

//STYLE
import "./PendingStructuresList.scss"

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import { Button } from "antd";

//TRANSLATION
import { useTranslation } from "react-i18next";

//TODO: PAGINATION


let responseApiGetAll = null;

const PendingStructuresList = (props) => {

    const [pendingStructureList, setPendingStructureList] = useState([]);

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
        let token = getLocalStorage('token');
        responseApiGetAll = await showPendingStructuresGetAllApi(token);
        console.log(responseApiGetAll)
        setPendingStructureList(responseApiGetAll.data.list);
    }

    useEffect(() => {
        getAll();
    }, [])

    const acceptPendingStructure = (clickedStructureId) => () => {

        console.log('accept clciked', clickedStructureId)

        const update = async () => {
            if (localStorage.getItem('token') !== null) {
                const HEADER = getLocalStorage('token');
                console.log('header', HEADER)
                await acceptPendingStructurePutApi(clickedStructureId, HEADER);
            }
            //const HEADER = decryptItem(props.tokenDuck.token);
            //console.log(acceptPendingStructurePutApi(clickedStructureId, HEADER));

        }

        update();



        let updated = pendingStructureList.filter((structure) => {
            return structure.id !== clickedStructureId
        })

        setPendingStructureList(updated)


    }


    const declinePendingStructure = (clickedStructureId) => () => {

        console.log('decline clciked', clickedStructureId)

        const decline = async () => {
            if (localStorage.getItem('token') !== null) {
                const HEADER = getLocalStorage('token');
                console.log('decline header', HEADER)
                await declinePendingStructurePutApi(clickedStructureId, HEADER);
            }
            //const HEADER = decryptItem(props.tokenDuck.token);
            //console.log(declinePendingStructurePutApi(clickedStructureId, HEADER));
        }

        decline();


        let declined = pendingStructureList.filter((structure) => {
            return structure.id !== clickedStructureId
        })

        setPendingStructureList(declined)


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
                {pendingStructureList.map(renderPendingStructures)}
            </CardList>
        </>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    userDuck: state.userDuck,
});

export default connect(mapStateToProps)(PendingStructuresList);