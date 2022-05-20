//STYLE
import "./StructureList.less";

//TRANSLATION
import { useTranslation } from "react-i18next";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import { Button } from "antd";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";

import { useNavigate } from "react-router-dom";
import { routes } from "../../../../../routes/routes";
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";

//TODO: manca get da backend
//TODO: manca navigate che al click sulla singola struttura la passa come oggetto a StructureDetails

const StructureList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const obj = [
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona",
        },
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona",
        },
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona",
        },
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona",
        },
    ];

    const goToStructure =
        (idStructure = null) =>
            () => {
                navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/${idStructure === null ? "new" : idStructure}`, {
                    state: { idStructure: idStructure },
                });

            };

    const getCardStructures = (structure, key) => {
        return (
            <HorizontalCard
                key={`${key}-${randomKey()}`}
                callback={goToStructure(key)}
                imageSrc={structure.img}
                altText={`${key}_${structure.title}`}
                title={structure.title}
                text={structure.text}
            />
        );
    };

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

    return (
        <CardList
            sectionTitle={t("bo.screens.host.structure.structureListTitle")}
            actions={
                <Button onClick={goToStructure()} type="primary">
                    {t("bo.screens.host.structure.addStructure")}
                </Button>
            }
            {...paginationProps}

        >
            {obj.map(getCardStructures)}
        </CardList>
    );
}

export default StructureList;
