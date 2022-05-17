import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import React from 'react'
import { faWifi, faUtensils, faFan, faParking, faJugDetergent, faShirt, faDesktop, faWaterLadder, faSmoking, faBell } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

/* link a service_id with the relative Font Awesome Icon */
const servicesToIcons = [{
    icon: faWifi,
    name: t("fe.components.service.wifi")
}, {
    icon: faUtensils,
    name: t("fe.components.service.kitchen")
}, {
    icon: faFan,
    name: t("fe.components.service.airConditioning")
}, {
    icon: faParking,
    name: t("fe.components.service.parking")
}, {
    icon: faJugDetergent,
    name: t("fe.components.service.washingMachine")
}, {
    icon: faShirt,
    name: t("fe.components.service.iron")
}, {
    icon: faDesktop,
    name: t("fe.components.service.workingPlace")
}, {
    icon: faWaterLadder,
    name: t("fe.components.service.swimmingPool")
}, {
    icon: faSmoking,
    name: t("fe.components.service.allowedSmoking")
}, {
    icon: faBell,
    name: t("fe.components.service.alarm")
}]

export { servicesToIcons }