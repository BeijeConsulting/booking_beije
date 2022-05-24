import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

//COMPONENTS
import CardList from "../../../../../components/backOffice/hookComponents/cardList/CardList";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ChoiceButton from "../../../../../components/backOffice/hookComponents/choiceButton/ChoiceButton";
import HorizontalCard from "../../../../../components/backOffice/hookComponents/horizontalCard/HorizontalCard";

// import Modal from "../../../../../components/common/modal/Modal";
import Modal from "antd/lib/modal/Modal";

//NAVIGATE
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../../routes/routes";

//ICON
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

//STYLE
import "./ReservationList.less";

//UTILS
import { randomKey } from "../../../../../utils/generalIteration/generalIteration";
import Routing from "../../../../../Routing";

const ReservationList = () => {
  //   const [state, setState] = useState([]); //state using for display announce categories

  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalRef = useRef(null);

  let selectedRes = null

  const showModal = (key) => {
    setIsModalVisible(true);
    selectedRes = key
  };

  const handleOk = () => {
    setIsModalVisible(false);
    //CHIAMATA API PER ELIMINAZIONE
    // ELIMINARE ELEMENTO CON selectedRes
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { t } = useTranslation();

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

  const showCalendar = (e) => {};

  const showAccepted = () => {
    //api get accepted
    //setState announce accepted on state.api and
  };

  const showPending = () => {
    //api get accepted
    //setState announce pending
  };
  const showRejected = () => {
    //api get accepted
    //setState announce refused
  };

  const switchToPage = (clickedPage) => {
    console.log("switch to page", clickedPage);
    //set paginationProps.currentPage to clickedPage (with useState)

    //remap new object's array from API
  };

  const paginationProps = {
    itemsCount: 50,
    pageSize: 10,
    paginationCallback: switchToPage,
  };

  const handleModal = (key, title) => () => {
    console.log(key, title);
    let oldText = modalRef.current.innerHTML
    modalRef.current.innerHTML = `${oldText.replaceAll(` ${title}?`, '')} ${title}?`
    showModal(key);
  };

  const renderReservations = (structure, key) => {
    return (
      <HorizontalCard
        key={`${key}-${randomKey()}`}
        imageSrc={structure.img}
        altText={`${key}_${structure.title}`}
        title={structure.title}
        text={structure.text}
        upperRightContent={
          <FontAwesomeIcon
            icon={faTrash}
            onClick={handleModal(`${key}-${randomKey()}`, structure.title)}
          />
        }
      />
    );
  };

  return (
    <CardList
      sectionTitle={t("bo.screens.host.reservationList.title")}
      actions={
        <>
          <ChoiceButton
            callbackFirstButton={showAccepted}
            firstButtonName={t("bo.screens.host.reservationList.accepted")}
            callbackSecondButton={showPending}
            secondButtonName={t("bo.screens.host.reservationList.pending")}
            callbackThirdButton={showRejected}
            thirdButtonName={t("bo.screens.host.reservationList.rejected")}
          />
          <Button onClick={showCalendar} type="primary">
            <FontAwesomeIcon icon={faCalendar} />
            {t("bo.screens.host.reservationList.calendar")}
          </Button>
        </>
      }
      {...paginationProps}
    >
      {obj.map(renderReservations)}
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} forceRender={true}>
        <h1>
          <FontAwesomeIcon icon={faTriangleExclamation} /> {t("bo.screens.host.reservationList.confirmReservationDelete")}
        </h1>
        <p ref={modalRef}>{t("bo.screens.host.reservationList.confirmReservationDeleteMessage")}</p>
      </Modal>
    </CardList>
  );
};

export default ReservationList;
