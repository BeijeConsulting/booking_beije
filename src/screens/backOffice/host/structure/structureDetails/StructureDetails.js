import React from "react";

//Style
import "./StructureDetails.less"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

//Components
// import HorizontalCard from './../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard';
// import Sidebar from "../../../../../components/backOffice/functionalComponent/sidebar/Sidebar";



const StructureDetails = () => {

    //header
    //footer

    //map da fare in seguito



    return (
        <>
            {/* to be concluded as soon as the component with the MAP is created */}
            <h1>StructureDetails</h1>

            <div>

                <Button><FontAwesomeIcon icon={faPen} />Edit structure</Button>
                <img src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />

                <h1>Camera bellissima</h1>

                <p>Chioggia, Italy</p>
                <p><FontAwesomeIcon icon={faHotel} />Hotel</p>
                <p>Lorem ipsum dolor sit amet li mortacis delo reduxos</p>
            </div>



        </>
    )
}

export default StructureDetails;