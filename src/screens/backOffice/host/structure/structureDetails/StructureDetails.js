import React from "react";

//TRANSLATION
import { useTranslation } from "react-i18next";

//Style
import "./StructureDetails.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

//ROUTING
import { routes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

//Components
import HorizontalCard from './../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';

// import Sidebar from "../../../../../components/backOffice/functionalComponent/sidebar/Sidebar";
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList"

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";


const StructureDetails = () => {

    //header
    //footer

    const { t } = useTranslation()

    const navigate = useNavigate()

    const obj = [
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        },
        {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        }, {
            img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            title: "Casa bellissima",
            text: "Casa in riva al mare a Savona"
        },
    ]

    const goToStructure = (idAnnounce = null) => () => {
        navigate(`/${routes.DASHBOARD}/${routes.STRUCTURE_OPERATION}/${idAnnounce === null ? "new" : idAnnounce}`, {
            state: { idAnnounce: idAnnounce },
        });

    };

    const getAnnounceCards = (announce, key) => {
        return <HorizontalCard
            key={`${key}-${randomKey()}`}
            imageSrc={announce.img}
            imageAlt={`${key}_${announce.title}`}
            title={announce.title}
            text={announce.text}
            callback={goToStructure(key)}
        />
    }

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

            <h1>{t("bo.screens.host.structureDetails.structureDetailsTitle")}</h1>
            <Button className="edit_button"><FontAwesomeIcon icon={faPen} />{t("bo.screens.host.structureDetails.editStructure")}</Button>
            <div className="structure_details_container">

                <img src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />

                <div className="structure_information">
                    <h1>Camera bellissima</h1>
                    <p>Chioggia, Italy</p>
                    <p><FontAwesomeIcon icon={faHotel} />Hotel</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae sem sagittis, ornare magna vitae, pulvinar augue. Quisque et euismod metus. Nunc blandit orci dui,
                        quis porttitor urna vestibulum vel.Praesent et turpis justo. Duis sed suscipit justo. Sed mollis, ex vitae vehicula ultrices, metus nibh interdum augue, sed tempus ligula nibh sed neque.
                        Nam id elit sed velit aliquam porta in sit amet magna.Duis nibh tellus, dictum id ante ac, vestibulum volutpat nibh. Donec finibus libero et purus consequat congue. Maecenas mollis, diam ut varius commodo,
                        leo nisi lacinia erat, at finibus lorem ex sed velit. Proin sem felis,eleifend eu gravida at, porta non nunc. Sed erat velit, tincidunt vel pellentesque vel, pellentesque eget nisi. Maecenas efficitur arcu faucibus,
                        blandit libero ut, finibus purus. Duis ut sollicitudin urna. Etiam sit amet imperdiet est. Cras tristique elit a ante suscipit maximus. Sed vulputate lorem nec nunc euismod, quis congue velit porta.
                        Aliquam sollicitudin ex non dui tempor laoreet. Nulla at varius dolor.
                    </p>
                </div>

            </div>


            <CardList
                sectionTitle="Annunci"
                actions={<Button>{t("bo.screens.host.structureDetails.addRoom")}</Button>}
                {...paginationProps}>
                {
                    obj.map(getAnnounceCards)
                }
            </CardList>
        </>
    )
}

export default StructureDetails;